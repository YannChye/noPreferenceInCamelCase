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
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, p.year\
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

@app.route("/api/population")
def population():
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
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, p.year\
        ORDER BY Population DESC\
        LIMIT 500\
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


@app.route("/api/mortality")
def mortality():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.crude_death as deaths, d.year\
        FROM demographic AS d\
        JOIN country AS c\
        ON d.country_id = d.id\
        JOIN geography AS g\
        ON c.geography_id = g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id = sdg.id\
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, d.crude_death, d.year\
        ORDER BY d.crude_death DESC\
        LIMIT 5\
")
   
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "deaths":float(r[4]),
            "year":r[5],

        }
        allData.append(data)

    return jsonify(allData)

@app.route("/api/lifetime")
def lifetime():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.life_exp as lifetime, d.year\
        FROM demographic AS d\
        JOIN country AS c\
        ON d.country_id = d.id\
        JOIN geography AS g\
        ON c.geography_id = g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id = sdg.id\
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, d.life_exp, d.year\
        ORDER BY d.life_exp DESC\
        LIMIT 5\
")
   
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "lifetime":float(r[4]),
            "year":r[5],

        }
        allData.append(data)

    return jsonify(allData)


@app.route("/api/popgrowth")
def popgrowth():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.pop_growth_percent as popgrowth, d.year\
        FROM demographic AS d\
        JOIN country AS c\
        ON d.country_id = d.id\
        JOIN geography AS g\
        ON c.geography_id = g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id = sdg.id\
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, d.pop_growth_percent, d.year\
        ORDER BY d.pop_growth_percent DESC\
        LIMIT 5\
")
   
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "popgrowth":float(r[4]),
            "year":r[5],

        }
        allData.append(data)

    return jsonify(allData)

@app.route("/api/birthrate")
def birthrate():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.crude_birth as birthrate, d.year\
        FROM demographic AS d\
        JOIN country AS c\
        ON d.country_id = d.id\
        JOIN geography AS g\
        ON c.geography_id = g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id = sdg.id\
        GROUP BY c.country, c.iso3_code, g.name,\
	    sdg.name, d.crude_birth, d.year\
        ORDER BY d.crude_birth DESC\
        LIMIT 5\
")
   
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "birthrate":float(r[4]),
            "year":r[5],

        }
        allData.append(data)

    return jsonify(allData)

if __name__ == "__main__":
    app.run()
