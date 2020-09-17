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
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#engine=create_engine(DATABASE_URL)

db=SQLAlchemy(app)
Subregion,SDG_region,Geography,UNdevgrp,WBincomegrp,Country,Population,Demographic=create_classes(db)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]

#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)

#     return render_template("form.html")


@app.route("/api/<year>")
def subregion():
    engine=create_engine(DATABASE_URL)
    conn=engine.connect()
    with engine.begin() as conn:
        response=conn.execute("SELECT c.country,c.iso3_code,g.name AS geography,\
	    sdg.name AS sdg,s.name AS subregion,u.name AS undev,\
	    w.name AS wbincome,p.year,p.age_start,p.population_male_thousands,\
	    p.population_female_thousands,p.population_total_thousands\
        FROM population AS p\
        JOIN country AS c\
        ON p.country_id=c.id\
        JOIN geography AS g\
        ON c.geography_id=g.id\
        JOIN sdg_region AS sdg\
        ON c.sdg_region_id=sdg.id\
        JOIN subregion AS s\
        ON c.subregion_id=s.id\
        JOIN un_developmentgroup AS u\
        on c.un_developmentgroup_id=u.id\
        JOIN worldbank_incomegroup AS w\
        on c.worldbank_incomegroup_id=w.id")
    
    allData=[]
    for r in response:
        data={
            "country":r[0],
            "iso3_code":r[1],
            "geography":r[2],
            "sdg":r[3],
            "subregion":r[4],
            "un_developmentgroup":r[5],
            "worldbank_incomegroup":r[6],
            "year":r[7],
            "age":r[8],
            "population_male_thousands":float(r[9]),
            "population_female_thousands":float(r[10]),
            "population_total_thousands":float(r[11]),
        }
        allData.append(data)

    return jsonify(allData)

@app.route("/api/sdg")
def sdg():
    results = db.session.query(SDG_region.id, SDG_region.name).all()

    #hover_text = [result[0] for result in results]
    id = [result[0] for result in results]
    name = [result[1] for result in results]

    sdgregion_data = [{"id": id,"name": name}]
    # pet_data = [{
    #    "type": "scattergeo",
    #    "locationmode": "USA-states",
    #     "lat": lat,
    #     "lon": lon,
    #     "text": hover_text,
    #     "hoverinfo": "text",
    #     "marker": {
    #         "size": 50,
    #         "line": {
    #             "color": "rgb(8,8,8)",
    #             "width": 1
    #         },
    #     }
    # }]

    return jsonify(sdgregion_data)

if __name__ == "__main__":
    app.run()
