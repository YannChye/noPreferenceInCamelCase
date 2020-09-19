//const url = "/api/population";
//var year = 2017;
//var age = 0;

var populationdata = [];
var country = "China"
var year = 2019

function getPop() {
    d3.json(url).then(function (data) {
        data.forEach(function (data) {
           // if (data.year == year && data.country == country) {
             //   populationdata.push(data)
                console.log(data.year);
                console.log(data.country);
            }
        })
    })
}



// create array for bar chart
// var trace1 = [{
//     type: "bar",
//     x: population,
//     y: country,
//     orientation: "h",
//     text: country
// }];
// Plotly.newPlot("bar", trace1);


// getPop()
