# noPreferenceInCamelCase

<!---Project Logo -->
<br />
<p align="center">
  <a href=>
    <img src="static/images/project_logo.jpg" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">World population trends 1950-2020</h3>
  <p align="center">
    A Data Visualisation
    <br />
</p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project
According to the ABS, the Australian population is set to double by 2066, which got us to thinking ...  What have been the macro trends for things like life expectancy, birth rates, population size and growth and how do they compare with the rest of the world?  So, like all good data nerds we went looking. 

We found the 2019 United Nations (UN) World Population Prospects as a rich source for key demographic indicators across the world, we crunched it together and here's our data viz "One Pager".  Hope you find it as interesting to use as we found making it.

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
Click on link to explore and interact with our [Dashboard](https:)


<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these steps.

### Prerequisites
* Install Conda or an equivalent framework and ensure it includes a Python version of 3.6 (or later).

To check your Python version
```sh
python --version
```
The latest version can be found at [https://www.python.org/downloads/](https://www.python.org/downloads/).  

Refer to the configuration file [requirements.txt](requirements.txt) for a complete list of all items required in your Conda environment to run the project.

Alternatively use the requirements.txt file to install the specified packages with the specified version
```sh
$ pip install -r requirements.txt
```


* flask_sqlalchemy
```sh
pip install flask-sqlalchemy
```

* PostgreSQL
```sh
https://www.postgresql.org/download/
```


### Installation

1. Get a free API Key at _mapbox_ [https://www.mapbox.com/](https://www.mapbox.com/)
2. Clone the repo
```sh
git clone https://github.com/YannChye/noPreferenceInCamelCase.git
```
3. Install all packages in the requirements.text
```sh
pip install requirements.text
```
4. Enter your API in `config.js`
```JS
const API_KEY = 'ENTER YOUR API';
```
5. Enter your PostgreSQL password in `password.py`
```PY
username='postgres'
passord='password123'
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





