const url="/api"
const coord="https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"

var myMap = L.map("map", {
  center: [39.5501, -105.7821],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

var year=2019;
var age=0;

var populationdata=[];
function getPop() {
  d3.json(url).then(function(data) {
    data.forEach(function(data) {
      if (data.year==year && data.age==age) {
        populationdata.push(data)
      }
    })
    buildMap(populationdata)
    })
}
function buildMap(populationdata) {
  d3.json(coord).then(function(data) {
    var coordinates=data.features;
    for (i=0;i<coordinates.length;i++) {
      for (j=0;j<populationdata.length;j++) {
        if (populationdata[j].iso3_code==coordinates[i].properties.ISO_A3) {
          coordinates[i].properties.population=populationdata[j].population_total_thousands;
        }}
        var feature=coordinates[i];
      //var iso=feature.properties.ISO_A3;
      //for (i=0;i<populationdata.length;i++) {
        //if (populationdata[i].iso3_code==iso) {
          //var number=Math.round(populationdata[i].population_total_thousands)}}
        L.geoJSON(feature).bindPopup("<p>"+feature.properties.population+"</p>").addTo(myMap)}
    //   //for (j=0;j<populationdata.length;j++) {
    //     //if (coordinates[i].properties.ISO_A3==populationdata[j].iso3_code) {
    //       var array=[]
    //       for (var k=0;k<coordinates[i].geometry.coordinates[0][0].length;k++) {
    //         array.push([coordinates[i].geometry.coordinates[0][0][k][1],coordinates[i].geometry.coordinates[0][0][k][0]])
    //       }
    //       L.polygon(array).bindPopup("<p>"+coordinates[i].properties.ISO_A3+"</p>").addTo(myMap)
    //     }
      //}
    //}
    // coordinates.forEach(function(data) {
    //   for (i=0;i<populationdata.length;i++) {
    //     if (populationdata[i].iso3_code==data.properties.ISO_A3) {
    //       var array=[]
    //       for (var i=0;i<data.geometry.coordinates.length;i++) {
    //         array.push([data.geometry.coordinates[i][1],data.geometry.coordinates[i][0]])
    //         console.log(array[0][1])
    //         L.polygon(array[0][1]).addTo(myMap)
    //       }
    //       break
    //     }
    //   }
    // })
    //geojson=L.choloropleth(data)
  });
}
getPop()