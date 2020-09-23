# import necessary libraries
import os
import sys
sys.path.append('00_config')
from password import username, password
from flask import (
    Flask,
    render_template,
    jsonify)
from sqlalchemy import create_engine
from sqlalchemy.sql import text

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

DATABASE_URL='postgresql://'+username+':'+password+'@localhost/world_population'

# create and connect to engine
engine=create_engine(DATABASE_URL)
conn=engine.connect()

# create route that renders landing page
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tech")
def tech():
    return render_template("index2.html")

# create routes for various APIs
# population data
@app.route("/api/population/<year>")
def population(year):
    s=text("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, p.year,\
        SUM(p.population_total_thousands) AS Population\
        FROM population AS p\
        JOIN country AS c\
        ON p.country_id=c.id\
        JOIN geography AS g\
        ON c.geography_id=g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id=sdg.id\
        WHERE p.year=:y\
        GROUP BY c.country, c.iso3_code, g.name,sdg.name,p.year\
        ORDER BY Population DESC")
   
    with engine.begin() as conn:
        response=conn.execute(s,y=year)

    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "year":r[4],
            "variable":float(r[5]),
        }
        allData.append(data)
    return jsonify(allData)

# various demographic data
@app.route("/api/demographic/<variable>/<year>")
def demographic(variable,year):
    s=text("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.crude_death, d.life_exp, d.pop_growth_percent,\
        d.crude_birth, d.year\
        FROM demographic AS d\
        JOIN country AS c\
        ON d.country_id = c.id\
        JOIN geography AS g\
        ON c.geography_id = g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id = sdg.id\
        WHERE d.year=:y")
    
    with engine.begin() as conn:
        response=conn.execute(s,y=year)

    if variable=="mortality":
        num=4
    elif variable=="lifetime":
        num=5
    elif variable=="popgrowth":
        num=6
    elif variable=="birthrate":
        num=7
    
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "year":r[8],
            "variable":float(r[num])
        }
        allData.append(data)
    newData=sorted(allData,key=lambda k: k['variable'],reverse=True) 

    return jsonify(newData)

# continent population data
@app.route("/api/geography/population")
def geographyPop():
    with engine.begin() as conn:
        response=conn.execute("SELECT g.name AS geography,p.year AS year,\
            SUM(p.population_total_thousands) AS population\
            FROM population AS p\
            JOIN country AS c\
            ON p.country_id=c.id\
            JOIN geography AS g\
            ON c.geography_id = g.id\
            GROUP BY g.name, p.year\
            ORDER BY p.year ASC")
   
    allData=[]
    for r in response:
        data={
            "geography":r[0],
            "year":r[1],
            "variable":float(r[2])
        }
        allData.append(data)

    return jsonify(allData)
    
# various continent demographic data
@app.route("/api/geography/<variable>")
def geographyDem(variable):
    with engine.begin() as conn:
        response=conn.execute("SELECT g.name AS geography,d.year AS year,\
            AVG(d.crude_death) AS mortality,\
            AVG(d.life_exp) AS lifetime,\
            AVG(d.pop_growth_percent) AS popgrowth,\
            AVG(d.crude_birth) AS birthrate\
            FROM demographic AS d\
            JOIN country AS c\
            ON d.country_id=c.id\
            JOIN geography AS g\
            ON c.geography_id = g.id\
            GROUP BY g.name, d.year\
            ORDER BY d.year ASC")
   
    if variable=="mortality":
        num=2
    elif variable=="lifetime":
        num=3
    elif variable=="popgrowth":
        num=4
    elif variable=="birthrate":
        num=5

    allData=[]
    for r in response:
        data={
            "geography":r[0],
            "year":r[1],
            "variable":float(r[num])
        }
        allData.append(data)

    return jsonify(allData)

if __name__ == "__main__":
    app.run()
