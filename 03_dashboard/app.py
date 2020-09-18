# import necessary libraries
import os
import sys
sys.path.append('../00_config')
from password import username, password
from flask import (
    Flask,
    render_template,
    url_for,
    jsonify,
    request,
    redirect)
from sqlalchemy import create_engine
from models import create_classes

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

DATABASE_URL='postgresql://'+username+':'+password+'@localhost/world_population'

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

#engine=create_engine(DATABASE_URL)

db=SQLAlchemy(app)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api")
def subregion():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, p.year,\
        SUM(p.population_total_thousands) AS Population\
        FROM population AS p\
        JOIN country AS c\
        ON p.country_id=c.id\
        JOIN geography AS g\
        ON c.geography_id=g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id=sdg.id\
        GROUP BY c.country, c.iso3_code, g.namesdg, p.year\
        LIMIT 5\
")
   
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "year":r[4],
            "Population":float(r[5]),
        }
        allData.append(data)

    return jsonify(allData)

# @app.route("/api/sdg")
# def sdg():
#     results = db.session.query(SDG_region.id, SDG_region.name).all()

#     #hover_text = [result[0] for result in results]
#     id = [result[0] for result in results]
#     name = [result[1] for result in results]

#     sdgregion_data = [{"id": id,"name": name}]


#     return jsonify(sdgregion_data)


# @app.route("/api/population")
# def subregion():
#     engine=create_engine(DATABASE_URL)
#     conn=engine.connect()
#     with engine.begin() as conn:
#         response=conn.execute("SELECT c.country,c.iso3_code,g.name AS geography,\
# 	    sdg.name AS sdg, p.year, p.age_start,p.population_male_thousands,\
# 	    p.population_female_thousands,p.population_total_thousands\
#         FROM population AS p\
#         JOIN country AS c\
#         ON p.country_id=c.id\
#         JOIN geography AS g\
#         ON c.geography_id=g.id\
#         JOIN sdg_region AS sdg\
#         ON c.sdg_region_id=sdg.id\
# ")
   
#     allData=[]
#     for r in response:
#         data={
#             "country":r[0],
#             "iso3_code":r[1],
#             "geography":r[2],
#             "sdg":r[3],
#             "year":r[4],
#             "age":r[5],
#             "population_male_thousands":float(r[6]),
#             "population_female_thousands":float(r[7]),
#             "population_total_thousands":float(r[7]),
#         }
#         allData.append(data)

#     return jsonify(allData)    



# @app.route("/api/population")
# def subregion():
#     engine=create_engine(DATABASE_URL)
#     conn=engine.connect()
#     with engine.begin() as conn:
#         response=conn.execute("SELECT c.country,c.iso3_code,g.name AS geography,\
# 	    sdg.name AS sdg,s.name AS subregion,u.name AS undev,\
# 	    w.name AS wbincome,p.year,p.age_start,p.population_male_thousands,\
# 	    p.population_female_thousands,p.population_total_thousands\
#         FROM population AS p\
#         JOIN country AS c\
#         ON p.country_id=c.id\
#         JOIN geography AS g\
#         ON c.geography_id=g.id\
#         JOIN sdg_region AS sdg\
#         ON c.sdg_region_id=sdg.id\
# ")
   
#     allData=[]
#     for r in response:
#         data={
#             "country":r[0],
#             "iso3_code":r[1],
#             "geography":r[2],
#             "sdg":r[3],
#             "year":r[4],
#             "age":r[5],
#             "population_male_thousands":float(r[6]),
#             "population_female_thousands":float(r[7]),
#             "population_total_thousands":float(r[7]),
#         }
#         allData.append(data)



# @app.route("/api/population")
# def subregion():
#     engine=create_engine(DATABASE_URL)
#     conn=engine.connect()
#     with engine.begin() as conn:
#         response=conn.execute("SELECT c.country,c.iso3_code,g.name AS geography,\
# 	    sdg.name AS sdg,s.name AS subregion,u.name AS undev,\
# 	    w.name AS wbincome,p.year,p.age_start,p.population_male_thousands,\
# 	    p.population_female_thousands,p.population_total_thousands\
#         FROM population AS p\
#         JOIN country AS c\
#         ON p.country_id=c.id\
#         JOIN geography AS g\
#         ON c.geography_id=g.id\
#         JOIN sdg_region AS sdg\
#         ON c.sdg_region_id=sdg.id\
# ")
   
#     allData=[]
#     for r in response:
#         data={
#             "country":r[0],
#             "iso3_code":r[1],
#             "geography":r[2],
#             "sdg":r[3],
#             "year":r[4],
#             "age":r[5],
#             "population_male_thousands":float(r[6]),
#             "population_female_thousands":float(r[7]),
#             "population_total_thousands":float(r[7]),
#         }
#         allData.append(data)



# @app.route("/api/population")
# def subregion():
#     engine=create_engine(DATABASE_URL)
#     conn=engine.connect()
#     with engine.begin() as conn:
#         response=conn.execute("SELECT c.country,c.iso3_code,g.name AS geography,\
# 	    sdg.name AS sdg,s.name AS subregion,u.name AS undev,\
# 	    w.name AS wbincome,p.year,p.age_start,p.population_male_thousands,\
# 	    p.population_female_thousands,p.population_total_thousands\
#         FROM population AS p\
#         JOIN country AS c\
#         ON p.country_id=c.id\
#         JOIN geography AS g\
#         ON c.geography_id=g.id\
#         JOIN sdg_region AS sdg\
#         ON c.sdg_region_id=sdg.id\
# ")
   
#     allData=[]
#     for r in response:
#         data={
#             "country":r[0],
#             "iso3_code":r[1],
#             "geography":r[2],
#             "sdg":r[3],
#             "year":r[4],
#             "age":r[5],
#             "population_male_thousands":float(r[6]),
#             "population_female_thousands":float(r[7]),
#             "population_total_thousands":float(r[7]),
#         }
#         allData.append(data)

if __name__ == "__main__":
    app.run()
