// initial parameter
var url="/api/population";
var year=2019;

const coord="https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"

var myMap = L.map("map", {
  center: [39.5501, -105.7821],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);


// get data by year
var mapdata=[];
function getData() {
  d3.json(url).then(function(data) {
    var maxVal=getMaxVal(data)
    data.forEach(function(data) {
      if (data.year==year) {
        mapdata.push(data)
      }
    })
    buildMap(mapdata,maxVal)
    })
}

//get maximum value
function getMaxVal(data) {  
  let valPrecision=Math.round(data[data.length-1]["Population"]).toString().length - 1;
  maxVal=data[data.length-1]["Population"]
  for (i=0;i<valPrecision-1;i++) {
    maxVal=maxVal/10
  }
  maxVal=Math.ceil(maxVal)
  for (i=0;i<valPrecision-1;i++) {
    maxVal=maxVal*10
  }
  return maxVal
}

// get map colour
function chooseColor(maxVal,feature) {
  if (feature > maxVal/10) { //note to self: have to change condition for different variables (population v death v life etc)
    return "#218173"
  }
  else if (feature > maxVal/100) {
    return "#7fc7ae"
  }
  else if (feature > maxVal/1000) {
    return "#d2dfdc"
  }
  else if (feature > maxVal/10000) {
    return "#99bbd6"
  }
  else if (feature > 0) {
    return "#497c94"
  }
  else {
    return "white"
  }
}

// build map from data
function buildMap(mapdata,maxVal) {
  d3.json(coord).then(function(data) {
    var coordinates=data.features;
    for (i=0;i<coordinates.length;i++) {
      for (j=0;j<mapdata.length;j++) {
        if (mapdata[j].iso3_code==coordinates[i].properties.ISO_A3) {
          coordinates[i].properties.varOfInterest=mapdata[j].Population;
          coordinates[i].properties.region=mapdata[j].sdg;
        }}
      var feature=coordinates[i];
        L.geoJSON(feature, {
          style: function(feature) {
            return {
              fillColor:chooseColor(maxVal,feature.properties.varOfInterest),
              fillOpacity:0.8,
              weight:0
            }
          }
        }).bindPopup(
          "<p><b>"+feature.properties.ADMIN+"</b></p>"+"<hr>"+
          "<p><b>region</b>: "+feature.properties.region+"</p>"+
          "<p><b>population</b>: "+(feature.properties.varOfInterest===undefined?"no data":(feature.properties.varOfInterest*1000).toLocaleString())+"</p>")
          .addTo(myMap)}
  });
}
getData()