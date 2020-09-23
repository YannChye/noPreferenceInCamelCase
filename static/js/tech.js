ImageMap('img[usemap]')

function changeImage(elmnt, value) {
    console.log(value);
    a = value;
    if (a === "Flask") {
        swal("Flask is a minimalistic python framework for building web apps (a light weight server). It makes development faster by offering code for all sorts of processes like database interaction or file activity")
    } else if (a === "JSON") {
        swal("JSON Stands for JavaScript Object Notation.  It is a lightweight format for storing and transporting data, often used when data is sent from a server to a web page");
    } else if (a === "SQLAlchemy") {
        swal("SQLAlchemy is an open source SQL toolkit and object-relational mapper (ORM) for Python.  It provides efficient and high-performing database access");
    } else if (a === "HTML") {
        swal("HTML describes the content of a webpage and CSS is used to specify its style.  JavaScript it transforms the HTML body from being a beautifully dressed CSS styled mannequin into a real-life walking talking human being");
    } else if  (a === "PostgreSQL") {
        swal("PostgreSQL is a powerful, open source object-relational database system using SQL language combined with features that safely store and scale the most complicated data workloads");
    } else if  (a === "CSV") {
        swal("CSV files are Comma Separated Values file. All CSV files are plain text files ie containing numbers and letters only.  Being structured in a tabular form makes them easy to import which is great for website developers who usually deal exchanging large amounts of data between different applications");
    } else if  (a === "Pandas") {
        swal("Pandas is an open-source data analysis module for Python.  It is used in a wide range of fields including academia, finance, economics, statistics and analytics as it offers high-performance, data analysis tools and easy to use data structures");
    } else if  (a === "Excel") {
        swal("Excel is a spreadsheeting tool that features calculation, graphing tools, pivot tables, and a macro programming language called Visual Basic for Applications");
    } else if  (a === "UNats") {
        swal("The United Nations is not only our data source but also an international organization of countries set up in 1945, in succession to the League of Nations, to promote international peace, security, and cooperation");
    } else if  (a === "Arrow1") {
        swal("Arrow1 data");
    } else if  (a === "Arrow2") {
        swal("Arrow2 data");
    } else if  (a === "Arrow3") {
        swal("Arrow3");
    } else if  (a === "Arrow4") {
        swal("Arrow4 data");
    } else if  (a === "Arrow5") {
        swal("Arrow5 data");
    } else if  (a === "Arrow6") {
        swal("Arrow6 data");
    } else if  (a === "Arrow7") {
        swal("3 data sets were sourced from the United Nations population prospects 2019 report.  Our population and demographics data sets were CSV and our country/geography data an Excel spreadsheet");
    } else {
        swal("Arrow8 data");
       
    }
};