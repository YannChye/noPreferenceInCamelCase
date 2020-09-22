// country boundaries polygons
const coord="https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// get all years
years=[];
for (i=0;i<70;i++) {
  years.push(i+1950);
}

function makeResponsive() {
  var svgArea = d3.select("#progress").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // set year SVG dimension
  var svgHeight=30;
  var svgWidth=window.innerWidth;
  // create svg container
  var svg = d3.select("#progress").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
  // each year as an svg rectangle
  var svgGroup=svg.append("g")
    .selectAll("rect")
    .data(years)
    .enter()
    .append("rect")
    .classed("year",true)
    .attr("x",(d,index) => {
      return (svgWidth-40)/70*index;
    })
    .attr("y",5)
    .attr("width",(d,index) => {
      return (svgWidth-40)/70-2
    })
    .attr("height",10)
    .attr("fill","#b5e7bd")
  .text((d,i) => {return years[i]})
  // when a year is selected
  .on("click", d => {
    year=d.path[0].innerHTML;
    d3.select(".year").text(year)
    d3.selectAll("rect")
      .attr("fill","#b5e7bd")
    console.log(this)
    d3.select(this)
      .attr("fill","#1d79b4")
    Plotly.relayout("line",{shapes:[{
      type:"line",
      x0:year,
      y0:0,
      x1:year,
      yref:"paper",
      y1:1,
      line:{
        color:"grey",
        width:1.5,
        dash:"dot"
      }
    }]})
    getData(varOfInterest[1],year) // update dashboard with selected year
  })
  .on("mouseover",d => {
    toolTip.html(`<p>${this.innerHTML}</p>`)
      .style("left",`${d3.select(this).attr("x")}px`)
      .style("top","150px")
      .style("background","grey")
    d3.select(this)
      .attr("height",15)
      .attr("y",0)
  })
  .on("mouseout",function() {
    d3.select(this)
      .attr("height",10)
      .attr("y",5);
    toolTip.style("background","none")
  })
  svg.append("g")
    .selectAll("text")
    .data(years)
    .enter()
    .append("text")
    .attr("x",function(d,index) {
      return (svgWidth-40)/70*index;
    })
    .attr("y",25)
    .attr("font-size","10px")
    .text(function(d) {
      if ([1950,1960,1970,1980,1990,2000,2010,2019].includes(d)) {
        return d
      }
    })
}

//toolTip for year
var toolTip=d3.select(".progress").append("div")
  .attr("class","tooltip")

// initial map
var myMap = L.map("map", {
  center: [0,0],
  zoom: 2
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// get data by year
function getData(url,year) {
  fullUrl=url+year;
  d3.json(fullUrl).then(function(data) {
    var minMax=getMinMax()
    buildMap(data,minMax[0],minMax[1])
    })
}

//get minimum and maximum value of each variable
function getMinMax() {  
  switch(varOfInterest[0]) {
    case "Population":
      return minMax=[10,1500000];
    case "Mortality Rate":
      return minMax=[0,60];
    case "Life Expectancy":
      return minMax=[10,90];
    case "Population Growth Rate":
      return minMax=[-10,20];
    case "Birth Rate":
      return minMax=[0,70];
    }
  }

// function for choropleth colours
var colors=["#f0fae9","#e1f5db","#c8eec9","#b5e7bd","#9fdbbf","#89d2ca","#6bbcce","#57add2","#3597c7","#1d79b4"]

function getInterval(minVal,maxVal) {
  let interval=(maxVal-minVal)/10
  return [minVal,minVal+interval,minVal+interval*2,minVal+interval*3,
    minVal+interval*4,minVal+interval*5,minVal+interval*6,minVal+interval*7,
    minVal+interval*8,minVal+interval*9]
}

function chooseColor(interval,feature) {
  if (feature > interval[9]) { //note to self: have to change condition for different variables (population v death v life etc)
    return colors[9];
  }
  else if (feature > interval[8]) {
    return colors[8];
  }
  else if (feature > interval[7]) {
    return colors[7];
  }
  else if (feature > interval[6]) {
    return colors[6];
  }
  else if (feature > interval[5]) {
    return colors[5];
  }
  else if (feature > interval[4]) {
    return colors[4];
  }
  else if (feature > interval[3]) {
    return colors[3];
  }
  else if (feature > interval[2]) {
    return colors[2];
  }
  else if (feature > interval[1]) {
    return colors[1];
  }
  else if (feature > interval[0]) {
    return colors[0];
  }
  else {
    return "white";
  }
}

// build map from data
function buildMap(mapdata,minVal,maxVal) {
  var interval=getInterval(minVal,maxVal)
  d3.json(coord).then(function(data) {
    var coordinates=data.features;
    for (i=0;i<coordinates.length;i++) {
      for (j=0;j<mapdata.length;j++) {
        if (mapdata[j].iso3_code==coordinates[i].properties.ISO_A3) {
          coordinates[i].properties.varOfInterest=mapdata[j].variable;
          coordinates[i].properties.region=mapdata[j].sdg;
          coordinates[i].properties.geography=mapdata[j].geography;
        }}
      var feature=coordinates[i];
      L.geoJSON(feature, {
          style: function(feature) {
            return {
              color:"white",
              fillColor:chooseColor(interval,feature.properties.varOfInterest),
              fillOpacity:1,
              weight:1,
            }
          },
          onEachFeature: function onEachFeature(feature,layer) {layer.on('click',function(e) {
            var continent=e.sourceTarget.feature.properties.geography;
            var country=e.sourceTarget.feature.properties.ISO_A3;
            lineChartforContinent(continent); // function to highlight line chart when country is selected
            getBar(country);
          })}
        }).bindPopup(
          "<b>"+feature.properties.ADMIN+"</b>"+"<hr>"+
          (feature.properties.varOfInterest===undefined?"no data":
          "<b>Continent</b>: "+feature.properties.geography+"<br>"+
          "<b>Region</b>: "+feature.properties.region+"<br>"+
          "<b>"+varOfInterest[0]+"</b>: "+
          (varOfInterest[0]=="Population"?(feature.properties.varOfInterest*1000).toLocaleString():
          Math.round(feature.properties.varOfInterest*100)/100)+
          (varOfInterest[0]=="Life Expectancy"?" years":"")+
          (varOfInterest[0]=="Population Growth Rate"?"%":"")
          ))
          .addTo(myMap)}
    // set up the legend
    d3.selectAll(".legend").each(function(d) {
      d3.select(this).remove()});
    var legend=L.control({position:"bottomleft"});
    legend.onAdd=function() {
      var div=L.DomUtil.create("div","info legend");
      var labels=[];
      var legendInfo="<h3>"+varOfInterest[0]
        +(varOfInterest[0]=="Life Expectancy"?" (years)":"")
        +(varOfInterest[0]=="Population Growth Rate"?" (%)":"")
        +"</h3><div class=\"labels\"><div class=\"min\">"+
        (varOfInterest[0]=="Population"?(minVal*1000).toLocaleString():minVal)
        +"</div><div class=\"med\">"+
        (varOfInterest[0]=="Population"?(((maxVal-minVal)/2+minVal)*1000).toLocaleString():((maxVal-minVal)/2+minVal))
        +"</div><div class=\"max\">"+
        (varOfInterest[0]=="Population"?(maxVal*1000).toLocaleString():maxVal)
        +"</div></div>";
      div.innerHTML=legendInfo;
      interval.forEach(function(val,index) {
        labels.push("<li style=\"background-color: "+colors[index]+"\"></li>")
      });
      div.innerHTML += "<ul>"+labels.join("")+"</ul>";
      return div;
    }
    legend.addTo(myMap)
  });
}

// get continent aggregate for line graph
var continentNames=["Africa","Asia","Europe","Latin America And The Caribbean","Northern America","Oceania"]

function lineChart(url) {
  var aggregPop=[[],[],[],[],[],[]];
  d3.json(url).then(function(data) {
    data.forEach(function(d) {
      for (i=0;i<continentNames.length;i++) {
        if (d.geography==continentNames[i]) {
          aggregPop[i].push(d.variable);
        }
      }
    })

    //create traces for line plot
    var traceAfrica={
      x:years,
      y:aggregPop[0],
      type:"line",
      name:"Africa",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    var traceAsia={
      x:years,
      y:aggregPop[1],
      type:"line",
      name:"Asia",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    var traceEurope={
      x:years,
      y:aggregPop[2],
      type:"line",
      name:"Europe",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    var traceLatame={
      x:years,
      y:aggregPop[3],
      type:"line",
      name:"Latin America And The Caribbean",
      line:{
        color:"rgba(232,232,232,0.2)",
        width:3
      }
    }
    var traceNorame={
      x:years,
      y:aggregPop[4],
      type:"line",
      name:"Northern America",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    var traceOceania={
      x:years,
      y:aggregPop[5],
      type:"line",
      name:"Oceania",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    // base line plot
    var data=[traceAfrica,traceAsia,traceEurope,traceLatame,traceNorame,traceOceania]
    var layout={
      showlegend:true,
      title:varOfInterest[0]+" over the Past 70 Years",
      xaxis:{title:"Year"},
      yaxis:{title:varOfInterest[0]+
        (varOfInterest[0]=="Life Expectancy"?" (years)":"")+
        (varOfInterest[0]=="Population Growth Rate"?" (%)":"")},
      shapes:[{
        type:"line",
        x0:year,
        y0:0,
        x1:year,
        yref:"paper",
        y1:1,
        line:{
          color:"grey",
          width:1.5,
          dash:"dot"
        }
      }]
    }
    Plotly.newPlot("line",data,layout);
  })
}

// function to highlight continent line when country is selected in map
function lineChartforContinent(continent) {
  for (i=0;i<continentNames.length;i++) {
    if (continent==continentNames[i]) {
      var num=i;
    }
  }
  Plotly.restyle("line",{"line.color":["rgba(232,232,232,0.5)"]})
  Plotly.restyle("line",{"line.color":["#1d79b4"]},num)
}

// function to toggle between demographic variables
function optionChanged(variable) {
  if (variable.innerHTML=="Population") {
    var url="/api/population/";
    var geographyUrl="/api/geography/population";
  }
  else if (variable.innerHTML=="Mortality Rate") {
    var url="/api/demographic/mortality/";
    var geographyUrl="/api/geography/mortality";
  }
  else if (variable.innerHTML=="Life Expectancy") {
    var url="/api/demographic/lifetime/";
    var geographyUrl="/api/geography/lifetime";
  }
  else if (variable.innerHTML=="Population Growth Rate") {
    var url="/api/demographic/popgrowth/";
    var geographyUrl="/api/geography/popgrowth";
  }
  else if (variable.innerHTML=="Birth Rate") {
    var url="/api/demographic/birthrate/";
    var geographyUrl="/api/geography/birthrate";
  }
  getData(url,year);
  lineChart(geographyUrl);
  var selected=variable.innerHTML;
  return varOfInterest=[selected,url];
}

// initial/default view
var varOfInterest=["Population","/api/population/"];
var year=2019;
getData(varOfInterest[1],year);
lineChart("/api/geography/population")
makeResponsive();
d3.select("#progress > svg > g:nth-child(1) > rect:nth-child(70)").attr("fill","#1d79b4")

// bar chart
var barColours = ["#006666", "#006666", "#339999", "#006666","#006666"]


function getBar(country) {
  var barCountry = []
  var barData = []
  fullUrl=varOfInterest[1]+year;
    d3.json(fullUrl).then(function (data) {
        // get index value of country
        for (let i = 0; i < data.length; i++) {
          if (data[i].iso3_code == country) {
              let tableRow = i;
              if (i == 0) {
                 tableRow = (i + 2);
                 barColours[2] = "#006666";
                 barColours[4] = "#339999";
              } else if (i == 1) {
                  tableRow = (i + 1);
                  barColours[2] = "#006666";
                  barColours[3] = "#339999";
              } else if (i == data.length - 2) {
                  tableRow = (i - 1);
                  barColours[2] = "#006666";
                  barColours[1] = "#339999";
              } else if (i == data.length - 1) {
                  tableRow = (i - 2);
                  barColours[2] = "#006666";
                  barColours[0] = "#339999";
              } else {
                  tableRow = i
              }
              barCountry.push(data[tableRow + 2].country);
              barCountry.push(data[tableRow + 1].country);
              barCountry.push(data[tableRow].country);
              barCountry.push(data[tableRow - 1].country);
              barCountry.push(data[tableRow - 2].country);
              barData.push(data[tableRow + 2].variable * 1000);
              barData.push(data[tableRow + 1].variable * 1000);
              barData.push(data[tableRow].variable * 1000);
              barData.push(data[tableRow - 1].variable * 1000);
              barData.push(data[tableRow - 2].variable * 1000);

          };
      };
      // create array for bar chart

      var trace1 = [{
          type: "bar",
          x: barData,
          y: barCountry,
          orientation: "h",
          hoverinfo: barData,
          marker: {
              color: barColours
          }
      }];
      Plotly.newPlot("bar", trace1);
  })
}