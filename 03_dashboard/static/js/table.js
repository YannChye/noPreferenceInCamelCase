//const url = "/api/population";
var getYear = 2017;
//var age = 0;

var populationdata = []
var getCountry = "Brazil"
var barCountry = []
var barData = []


function getBar() {
    d3.json(url).then(function (data) {
        data.forEach(function (data) {
            if (data.year == getYear) {
                populationdata.push(data);
            }
        })
        // get index value of country
        for (let i = 0; i < populationdata.length; i++) {
            if (populationdata[i].country == getCountry) {
                barCountry.push(populationdata[i + 2].country);
                barCountry.push(populationdata[i + 1].country);
                barCountry.push(populationdata[i].country);
                barCountry.push(populationdata[i - 1].country);
                barCountry.push(populationdata[i - 2].country);
                barData.push(populationdata[i + 2].Population);
                barData.push(populationdata[i + 1].Population);
                barData.push(populationdata[i].Population);
                barData.push(populationdata[i - 1].Population);
                barData.push(populationdata[i - 2].Population);
            };
        };
        console.log(barData);
        // create array for bar chart
        var trace1 = [{
            type: "bar",
            x: barData,
            y: barCountry,
            orientation: "h",
            hoverinfo: barData,
            marker: {
                color:["#006666","#006666","#339999","#006666","#006666"]
              }
        }];
        Plotly.newPlot("bar", trace1);
    })
}

getBar()
