// country boundaries polygons
const coord="https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

// get all years
function getYears() {
  d3.json("/api/years").then(data=> {
    years=data.years;
    makeResponsive(years)
  })
}

// create year progress bar
function makeResponsive(years) {
  var svgArea = d3.select(".progress").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  // set year SVG dimension
  var svgHeight=50;
  var svgWidth=window.innerWidth;
  // create svg container
  var svg = d3.select(".progress").append("svg")
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
      return (svgWidth-40)/years.length*index+20;
    })
    .attr("y",5)
    .attr("width",(d,index) => {
      return (svgWidth-40)/years.length-2
    })
    .attr("height",10)
    .attr("fill","#86cdc7")
    .text((d,i) => {return years[i]})
  // when a year is selected
    .on("click",function(d) {
    year=d.path[0].innerHTML;
    d3.select(".year").text(year)
    d3.selectAll("rect")
      .attr("fill","#86cdc7")
    d3.select(this)
      .attr("fill","#004d40")
    Plotly.relayout("line",{shapes:[{ //update line chart year indicator
      type:"line",
      x0:year,
      y0:0,
      x1:year,
      yref:"paper",
      y1:1,
      line:{
        color:"#004d40",
        width:1.5,
        dash:"dot"
      }
    }],
    annotations:[{
        x:year,
        y:1.05,
        xref:'x',
        yref:'paper',
        text:"<b>"+year+"<b>",
        showarrow:false,
        font:{
          size:12,
          color:"#004d40"
        }
      }]
    })
    myMap.closePopup(); //close map popup
    getData(varOfInterest[1],year) // update dashboard with selected year
    getBar(countryIso) // update bar chart
  })
  .on("mouseover",function(d) {
    toolTip.html(`<p>${this.innerHTML}</p>`)
      .style("left",`${d3.select(this).attr("x")-10}px`)
      .style("top","200px")
      .style("background","grey")
      .style("opacity",1)
    d3.select(this)
      .attr("height",15)
      .attr("y",0)
  })
  .on("mouseout",function() {
    d3.select(this)
      .attr("height",10)
      .attr("y",5);
    toolTip.style("opacity",0)
  })
  svg.append("g")
    .selectAll("text")
    .data(years)
    .enter()
    .append("text")
    .attr("x",(d,index) => {
      return (svgWidth-40)/years.length*index+10;
    })
    .attr("y",25)
    .attr("font-size","10px")
    .text(d => {
      if ([1950,1960,1970,1980,1990,2000,2010,2019].includes(d)) {
        return d
      }
  })
  if (year=2019) { //colour year 2019 on default page
    for (var a of document.querySelectorAll("rect")) {
      if (a.textContent.includes(2019)) {
        d3.select(a).attr("fill","#15505b");
      }
    }
  }
}

//toolTip for year popup
var toolTip=d3.select(".progress").append("div")
  .attr("class","tooltip")

// initial map
var myMap = L.map("map", {
  center: [0,0],
  zoom: 1
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// get data by year
function getData(url,year) {
  let fullUrl=url+year;
  getBar(countryIso); //update bar chart
  d3.json(fullUrl).then((data) => {
    var minMax=getMinMax()
    buildMap(data,minMax[0],minMax[1])
    })
}

//get minimum and maximum value of each variable
function getMinMax() {  
  switch(varOfInterest[0]) {
    case "Total Population":
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
var colors=["#86cdc7","#59bbb2","#2da99d","#009688","#008476","#007264","#006052","#004d40"]

function getInterval(minVal,maxVal) {
  let interval=(maxVal-minVal)/8
  return [minVal,minVal+interval,minVal+interval*2,minVal+interval*3,
    minVal+interval*4,minVal+interval*5,minVal+interval*6,minVal+interval*7]
}

function chooseColor(interval,feature) {
  if (feature > interval[7]) { //note to self: have to change condition for different variables (population v death v life etc)
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
            if (continent!==undefined) {
            lineChartforContinent(continent); // function to highlight line chart when country is selected
            getBar(country);
            countryIso=country;
          }})}
        }).bindPopup(
          "<b>"+feature.properties.ADMIN+"</b>"+"<hr>"+
          (feature.properties.varOfInterest===undefined?"no data":
          "<b>Continent</b>: "+feature.properties.geography+"<br>"+
          "<b>Region</b>: "+feature.properties.region+"<br>"+
          "<b>"+varOfInterest[0]+"</b>: "+
          (varOfInterest[0]=="Total Population"?(feature.properties.varOfInterest*1000).toLocaleString():
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
      var labels=["<li style=\"background-color: white\"></li>"];
      var legendInfo="<strong>"+varOfInterest[0]
        +(varOfInterest[0]=="Life Expectancy"?" (years)":"")
        +(varOfInterest[0]=="Population Growth Rate"?" (%)":"")
        +"</strong><div class=\"labels\"><div class=\"min\">"+"no data&nbsp;&nbsp;&nbsp;&nbsp;"+
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
  var years=[]
  d3.json(url).then(function(data) {
    data.forEach(function(d) {
      if (!years.includes(d.year)) {
        years.push(d.year)
      }
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
      hovertemplate:`<b>Africa</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(219,219,219,0.5)",
        width:3
      }
    }
    var traceAsia={
      x:years,
      y:aggregPop[1],
      hovertemplate:`<b>Asia</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(219,219,219,0.5)",
        width:3
      }
    }
    var traceEurope={
      x:years,
      y:aggregPop[2],
      hovertemplate:`<b>Europe</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(232,232,232,0.5)",
        width:3
      }
    }
    var traceLatame={
      x:years,
      y:aggregPop[3],
      hovertemplate:`<b>Latin America</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(219,219,219,0.5)",
        width:3
      }
    }
    var traceNorame={
      x:years,
      y:aggregPop[4],
      hovertemplate:`<b>Northern America</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(219,219,219,0.5)",
        width:3
      }
    }
    var traceOceania={
      x:years,
      y:aggregPop[5],
      hovertemplate:`<b>Oceania</b><br>year: %{x}<br>%{y}`,
      type:"line",
      name:"",
      line:{
        color:"rgba(219,219,219,0.5)",
        width:3
      }
    }
    // base line plot
    var data=[traceAfrica,traceAsia,traceEurope,traceLatame,traceNorame,traceOceania]
    var layout={
      showlegend:false,
      margin:{
        l:50,
        r:0,
        b:50,
        t:50,
        pad:0
      },
      hovermode:"closest",
      title:{
        "text":varOfInterest[0]+" by Continent<br>over the Past 70 Years",
        "xanchor":"right",
        "x":1,
        "y":0.95,
        "yanchor":"top"
    },
      font:{
        family:'Times New Roman, Times, serif',
        size:10
      },
      xaxis:{title:{
        text:"Year",
        standoff:5}},
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
          color:"#004d40",
          width:1.5,
          dash:"dot"
        }
      }],
      annotations:[
        {
          x:year,
          y:1.05,
          xref:'x',
          yref:'paper',
          text:"<b>"+year+"<b>",
          showarrow:false,
          font:{
            size:12,
            color:"#004d40"
          }
        }
      ]
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
  Plotly.restyle("line",{"line.color":["#008476"]},num)
}

// bar chart
function getBar(countryCode) {
  var barColours = ["#2DA99D","#2DA99D","#006052","#2DA99D","#2DA99D"]
  var barCountry = []
  var barData = []
  fullUrl=varOfInterest[1]+year;
    d3.json(fullUrl).then(function (data) {
        // get index value of country
        for (let i = 0; i < data.length; i++) {
          if (data[i].iso3_code == countryCode) {
              var country=data[i].country
              let tableRow = i;
              var ind;
              if (i == 0) {
                tableRow = (i + 2);
                barColours[2] = "#2DA99D";
                barColours[4] = "#006052";
                ind=3;
              } else if (i == 1) {
                  tableRow = (i + 1);
                  barColours[2] = "#2DA99D";
                  barColours[3] = "#006052";
                  ind=3;
              } else if (i == data.length - 2) {
                  tableRow = (i - 1);
                  barColours[2] = "#2DA99D";
                  barColours[1] = "#006052";
                  ind=data.length-2;
              } else if (i == data.length - 1) {
                  tableRow = (i - 2);
                  barColours[2] = "#2DA99D";
                  barColours[0] = "#006052";
                  ind=data.length-2;
              } else {
                  tableRow = i
                  ind=i+1;
              }
              barCountry.push(data[tableRow + 2].country+" ");
              barCountry.push(data[tableRow + 1].country+" ");
              barCountry.push(data[tableRow].country+" ");
              barCountry.push(data[tableRow - 1].country+" ");
              barCountry.push(data[tableRow - 2].country+" ");
              if (varOfInterest[0]=="Total Population") {
                barData.push(data[tableRow + 2].variable * 1000);
                barData.push(data[tableRow + 1].variable * 1000);
                barData.push(data[tableRow].variable * 1000);
                barData.push(data[tableRow - 1].variable * 1000);
                barData.push(data[tableRow - 2].variable * 1000);
              } else {
                barData.push(data[tableRow + 2].variable);
                barData.push(data[tableRow + 1].variable);
                barData.push(data[tableRow].variable);
                barData.push(data[tableRow - 1].variable);
                barData.push(data[tableRow - 2].variable);
              }

          };
      };
      // wraparound long country names
      for (i=0;i<barCountry.length;i++) {
        if (barCountry[i].length>15) {
          var splitted=barCountry[i].split(" ");
          let joined=""
          for (j=0;j<splitted.length;j++) {
            if (splitted[j].length>8 || joined.length>8) {
              if (!joined.includes("<br>")) {
                joined=joined+" <br>"+splitted[j]
              }
              else {joined=joined+" "+splitted[j]}
            }
            else {joined=joined+" "+splitted[j]}
          }      
          barCountry[i]=joined;
            }
        }
      var traceBar = [{
          type: "bar",
          x: barData,
          y: barCountry,
          width:0.8,
          orientation: "h",
          hoverinfo: barData,
          marker: {
              color: barColours
          }
      }];
      var layoutBar={
        autosize:true,
        margin:{
          l:100,
          r:0,
          b:50,
          t:50,
          pad:0
        },
        hovermode:'closest',
        title:{
          "text":"Relative "+varOfInterest[0]+" of<br>"+country+" in the World",
          "xanchor":"right",
          "x":0.95,
          "yanchor":"top"
      },
        font:{
          family:'Times New Roman, Times, serif',
          size:10
        },
        xaxis:{title:{text:varOfInterest[0]+
          (varOfInterest[0]=="Life Expectancy"?" (years)":"")+
          (varOfInterest[0]=="Population Growth Rate"?" (%)":""),standoff:10}
        },
        annotations: [
            {
              x: 0,
              y: 5.5,
              xref: 'paper',
              yref: 'y',
              font:{
                size:12,
                color:"white"
              },
              text: "RANK",
              borderpad: 4,
              bgcolor: "darkgrey",
              showarrow: false
          },
          {
              x: 0,
              y: 0,
              xref: 'paper',
              yref: 'y',
              text: `<b>${ind+2}</b>`,
              font:{
                size:11,
                color:"black"
              },
              borderpad: 3,
              bgcolor: "darkgrey",
              showarrow: false
          },
          {
              x: 0,
              y: 1,
              xref: 'paper',
              yref: 'y',
              text: `<b>${ind+1}</b>`,
              font:{
                size:12,
                color:"black"
              },
              borderpad: 3,
              bgcolor: "darkgrey",
              showarrow: false,
          },
          {
            x: 0,
            y: 2,
            xref: 'paper',
            yref: 'y',
            text: `<b>${ind}</b>`,
            font:{
              size:12,
              color:"black"
            },
            borderpad: 3,
            bgcolor: "darkgrey",
            showarrow: false
          },
          {
            x: 0,
            y: 3,
            xref: 'paper',
            yref: 'y',
            text: `<b>${ind-1}</b>`,
            font:{
              size:12,
              color:"black"
            },
            borderpad: 3,
            bgcolor: "darkgrey",
            showarrow: false,
          },
          {
            x: 0,
            y: 4,
            xref: 'paper',
            yref: 'y',
            text: `<b>${ind-2}</b>`,
            font:{
              size:12,
              color:"black"
            },
            borderpad: 3,
            bgcolor: "darkgrey",
            showarrow: false
      }
          ]
        }
      Plotly.newPlot("bar",traceBar,layoutBar);
  })
}

// function to toggle between demographic variables
function optionChanged(variable) {
  myMap.closePopup(); //close map popup
  d3.select(".mainVar").text(variable.innerHTML)
  if (variable.innerHTML=="Total Population") {
    var url="/api/demographic/population/";
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
var countryIso="AUS";
var varOfInterest=["Total Population","/api/demographic/population/"];
var year=2019;
getYears();
getData(varOfInterest[1],year);
lineChart("/api/geography/population");