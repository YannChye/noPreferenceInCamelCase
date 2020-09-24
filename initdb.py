# import dependencies
import os
import pandas as pd
import sys
from sqlalchemy import create_engine, inspect
from sqlalchemy_utils import database_exists, create_database

# set csv import path
countrypath=os.path.join('01_transform_data','country.csv')
geogpath=os.path.join('01_transform_data','geog_region.csv')
sdgregionpath=os.path.join('01_transform_data','sdg_region.csv')
demopath=os.path.join('01_transform_data','demographic.csv')

## IF RUNNING ON HEROKU, run the following line to create engine
## replace 'heroku_postgres_uri' with heroku's postgres uri
########################################################
engine = create_engine('heroku_postgres_uri')

########################################################

## IF RUNNING LOCALLY, run the following lines
## ensure that you have your local postgres username and possword stored in ./00_config/password.py
########################################################
# sys.path.append('./00_config')
# from password import username, password
# engine = create_engine('postgresql://'+username+':'+password+'@localhost/world_population')
# if not database_exists(engine.url):
#    create_database(engine.url)

########################################################

# import data
countrydata=pd.read_csv(countrypath)
geogdata=pd.read_csv(geogpath)
sdgregiondata=pd.read_csv(sdgregionpath)
demodata=pd.read_csv(demopath)

## if running on Heroku, run the following line to cull number of years of demographic data
## as free postgres plan only allows for 10,000 rows of data
########################################################
demodata=demodata[demodata["year"]>=1980]

########################################################

# create year table
yeardata=pd.DataFrame({"year":demodata["year"].unique().tolist()})

#drop table if exists
engine.execute("DROP TABLE IF EXISTS demographic")
engine.execute("DROP TABLE IF EXISTS country")
engine.execute("DROP TABLE IF EXISTS geography")
engine.execute("DROP TABLE IF EXISTS sdg_region")
engine.execute("DROP TABLE IF EXISTS year")

# create tables & constraints in SQL
# year table
engine.execute("CREATE TABLE year (year INT NOT NULL PRIMARY KEY)")
# SDG region table
engine.execute("CREATE TABLE sdg_region (\
                    id INT NOT NULL PRIMARY KEY,\
                    name VARCHAR(100) NOT NULL)")
# geographical region table
engine.execute("CREATE TABLE geography (\
                    id INT NOT NULL PRIMARY KEY,\
                    name VARCHAR(100) NOT NULL)")
# country table
engine.execute("CREATE TABLE country (\
                    id INT NOT NULL PRIMARY KEY,\
                    iso3_code CHAR(3) UNIQUE NOT NULL,\
                    country VARCHAR(100) UNIQUE NOT NULL,\
                    sdg_region_id INT NOT NULL,\
                    geography_id INT NOT NULL,\
                    FOREIGN KEY (sdg_region_id)\
                    REFERENCES sdg_region(id),\
                    FOREIGN KEY (geography_id)\
                    REFERENCES geography(id))")
# demographic table
engine.execute("CREATE TABLE demographic (\
                    id SERIAL PRIMARY KEY,\
                    country_id INT NOT NULL,\
                    year INT NOT NULL,\
                    crude_death DECIMAL NOT NULL,\
                    life_exp DECIMAL NOT NULL,\
                    crude_birth DECIMAL NOT NULL,\
                    pop_growth_percent DECIMAL NOT NULL,\
                    population_total_thousands DECIMAL NOT NULL,\
                    FOREIGN KEY (country_id)\
                    REFERENCES country(id),\
                    FOREIGN KEY (year)\
                    REFERENCES year(year))")

# save data into SQL database
yeardata.to_sql(name='year', con=engine, if_exists='append', index=False)
sdgregiondata.to_sql(name='sdg_region', con=engine, if_exists='append', index=False)
geogdata.to_sql(name='geography', con=engine, if_exists='append', index=False)
countrydata.to_sql(name='country', con=engine, if_exists='append', index=False)
demodata.to_sql(name='demographic',con=engine, if_exists='append', index=False)