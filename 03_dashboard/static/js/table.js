//const url = "/api/population";
var getYear = 2017;
//var age = 0;

var populationdata = []
var getCountry = "Mexico"
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
                let tableRow = i;
                if (i == 0) {
                    tableRow = (i + 2)
                } else if (i == 1) {
                    tableRow = (i + 1)
                } else if (i == populationdata.length - 2) {
                    tableRow = (i - 1)
                } else if (i == populationdata.length - 1) {
                    tableRow = (i - 2)
                } else {
                    tableRow = i
                }
                barCountry.push(populationdata[tableRow + 2].country);
                barCountry.push(populationdata[tableRow + 1].country);
                barCountry.push(populationdata[tableRow].country);
                barCountry.push(populationdata[tableRow - 1].country);
                barCountry.push(populationdata[tableRow - 2].country);
                barData.push(populationdata[tableRow + 2].Population * 1000);
                barData.push(populationdata[tableRow + 1].Population * 1000);
                barData.push(populationdata[tableRow].Population * 1000);
                barData.push(populationdata[tableRow - 1].Population * 1000);
                barData.push(populationdata[tableRow - 2].Population * 1000);
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
                color: ["#006666", "#006666", "#339999", "#006666", "#006666"]
            }
        }];
        Plotly.newPlot("bar", trace1);
    })
}

getBar()
