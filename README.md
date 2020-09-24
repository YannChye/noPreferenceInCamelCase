# noPreferenceInCamelCase

<!---Project Logo -->
<br />
<p align="center">
  <a href=>
    <img src="static/images/project_logo.jpg" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">World Demographic Trends 1950-2019</h3>
  <p align="center">
    A Data Visualisation Project
    <br />
</p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Usage](#usage)
* [Getting Started](#getting-started)
  * [Heroku](#heroku)
  * [Local](#local)
* [Contributors](#contributors)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project
According to the ABS, the Australian population is set to double by 2066, which got us to thinking ...  What have been the macro trends for things like life expectancy, birth rates, population size and growth and how do they compare with the rest of the world?  So, like all good data nerds we went looking. 

We found the [2019 United Nations (UN) World Population Prospects](https://population.un.org/wpp/) as a rich source for key demographic indicators across the world, we crunched it together and here's our data viz "One Pager".  Hope you find it as interesting to use as we found making it.

### Built With
* [Python](https://www.python.org/about/)
  * [SQLAlchemy](https://docs.sqlalchemy.org/en/13/)
  * [pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/index.html)
  * [Flask](https://flask-doc.readthedocs.io/en/latest/)
* [PostgreSQL](https://www.postgresql.org/)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS#:~:text=Cascading%20Style%20Sheets%20%28CSS%29%20is%20a%20stylesheet%20language,on%20paper%2C%20in%20speech%2C%20or%20on%20other%20media.)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript)
  * [d3.js](https://d3js.org/)
  * [Leaflet](https://leafletjs.com/)
  * [SweetAlert](https://sweetalert.js.org/guides/)
  * [Image-map](https://www.npmjs.com/package/image-map)
  * [Plotly](https://plotly.com/javascript/)


<!-- USAGE EXAMPLES -->
## Usage
We have provided an abbreviated dashboard of the world demographics on heroku. The dashboard contains only demographic data from 1980-2019 (unfortunately, due to the row limit in the free version of Heroku Postgres!).

Click on the link to explore and interact with our [Dashboard](https://world-demographics.herokuapp.com)

<!-- GETTING STARTED -->
## Getting Started
If you wish to run a local version with the full dataset, skip to [Local](#local). If you wish to run a scaled down version on your own Heroku app, follow the following [Heroku](#heroku) steps.

### Heroku
**To get your own database and app up and running on heroku, follow these steps.**
1. Fork our directory on github.
2. Sign up for an [Heroku](https://www.heroku.com/) account.
3. Sign up for [mapbox](https://www.mapbox.com/), and replace your api key with ours on the _/static/js/config.js_ file. Remember to restrict your mapbox api key to your app url, so you don't get hit with nasty charges!!!
4. Connect your github page to a new Heroku app, and click **'Deploy'**.
5. Add your database to your Heroku app. To do so - 
  * add-on Heroku Postgres to your app
  * grab your Postgres database URI from Heroku Postgres > Settings > View Credentials
  * in the **initdb.py** file, replace 'heroku_postgres_uri' on line 15 with the uri you just obtained
  * run the following. Don't worry if it is slow, it will take a while for the database to populate.
  ```sh
  $ python initdb.py
  ```
  * And now you are all set. Have fun with your new app!

### Local
**To get a local copy up and running follow these steps.**
1. Clone our directory down to your local machine.
```sh
git clone https://github.com/YannChye/noPreferenceInCamelCase.git
```
2. Ensure you have the following [Python](https://www.python.org/downloads/) version 3.6 or later installed.
3. Ensure you have the libraries listed in [requirements.txt](requirements.txt) installed. An easy way to do so is to type
  ```sh
  $ pip install -r requirements.txt
  ```
4. Download a version of [PostgreSQL](https://www.postgresql.org/download/) onto your machine, and enter your PostgreSQL password in `password.py`
```PY
username='postgres'
passord='password123'
```
5. Get a free API Key at _mapbox_ [https://www.mapbox.com/](https://www.mapbox.com/), and replace your api key with ours on the _/static/js/config.js_ file.
6. To set up your database, comment out _line 17_ (that is for the heroku version) and comment in _lines 24-28_ (local version) in **initdb.py**. Then, run    
```sh
$ python initdb.py
```
7. To run your page, first run the following line in your terminal/git bash, replacing _username_ and _password_ with your postgres username and password
```sh
$ export DATABASE_URL=postgresql://username:password@localhost/world_population
```
8. Run app.py and you are all set. Open up the flask page and have fun!
```sh
$ python app.py
```

<!-- CONTRIBUTORS -->
## Contributors

* Yann Chye
* Susov Dhakal
* Michelle Hocking

***





<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

**Design adapted from:**

_The Health in Retirement Index_. Retrieved from: [https://hi.knoema.com/wcoqzud/the-health-in-retirement-index](https://hi.knoema.com/wcoqzud/the-health-in-retirement-index)


**Data sourced from :**

_United Nations Department of Economic and Social Affairs Population Dynamics _World Population Prospects 2019_ : Total Population - Both Sexes (XLSX, 2.4 MB)_.  Retrieved from: [https://population.un.org/wpp/Download/Standard/Population/](https://population.un.org/wpp/Download/Standard/Population/)

_United Nations Department of Economic and Social Affairs Population Dynamics _World Population Prospects 2019_ : Locations (XLSX, 131 KB)_.  Retrieved from: [https://population.un.org/wpp/Download/Metadata/Documentation/](https://population.un.org/wpp/Download/Metadata/Documentation/)

_United Nations Department of Economic and Social Affairs Population Dynamics _World Population Prospects 2019_ : 	
Annual Demographic Indicators (XLSX, 33.41 MB)_.  Retrieved from: [https://population.un.org/wpp/Download/SpecialAggregates/EconomicTrading/](https://population.un.org/wpp/Download/SpecialAggregates/EconomicTrading/)

_GeoJSON polygons for country boundaries_. Retrieved from: [https://github.com/datasets/geo-countries](https://github.com/datasets/geo-countries)


**Additional reference materials:**

_datapine dashboard knowledge base_ Retrieved from: [https://www.datapine.com/documentation/](https://www.datapine.com/documentation/)

_Image Map Generator_ Retrieved from: [https://www.image-map.net/](https://www.image-map.net/)

_Best-README-Template_ Retrieved from: [https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)

_HTML Image Maps_ Retrieved from: [https://www.w3schools.com/htmL/html_images_imagemap.asp](https://www.w3schools.com/htmL/html_images_imagemap.asp)





