# import necessary libraries
import os
import sys
from flask import (
    Flask,
    render_template,
    jsonify)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.sql import text

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

## if running locally, run the following line in the terminal before running the app.py
## where username and password are your postgres username and password
#################################################
#export DATABASE_URL=postgresql://username:password@localhost/world_population

#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# create and connect to engine
engine=db.engine

#################################################

# create route that renders landing page
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tech")
def tech():
    return render_template("tech.html")

@app.route("/about")
def about():
    return render_template("about.html")

# create routes for various APIs
# various demographic data
@app.route("/api/demographic/<variable>/<year>")
def demographic(variable,year):
    s=text("SELECT c.country, c.iso3_code, g.name AS geography,\
	    sdg.name AS sdg, d.crude_death, d.life_exp, d.pop_growth_percent,\
        d.crude_birth, d.population_total_thousands, d.year\
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
    elif variable=="population":
        num=8
    
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "year":r[9],
            "variable":float(r[num])
        }
        allData.append(data)
    newData=sorted(allData,key=lambda k: k['variable'],reverse=True) 

    return jsonify(newData)

# various continent demographic data
@app.route("/api/geography/<variable>")
def geographyDem(variable):
    with engine.begin() as conn:
        response=conn.execute("SELECT g.name AS geography,d.year AS year,\
            AVG(d.crude_death) AS mortality,\
            AVG(d.life_exp) AS lifetime,\
            AVG(d.pop_growth_percent) AS popgrowth,\
            AVG(d.crude_birth) AS birthrate,\
            SUM(d.population_total_thousands) AS population\
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
    elif variable=="population":
        num=6

    allData=[]
    for r in response:
        data={
            "geography":r[0],
            "year":r[1],
            "variable":float(r[num])
        }
        allData.append(data)

    return jsonify(allData)

# years
@app.route("/api/years")
def years():
    with engine.begin() as conn:
        response=conn.execute("SELECT * FROM year\
            ORDER BY year ASC")
    
    data=[]
    for r in response:
        data.append(r[0])
    
    allData={
            "years":data
        }
        
    return jsonify(allData)

# run app
if __name__ == "__main__":
    app.run()
