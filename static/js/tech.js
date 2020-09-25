ImageMap('img[usemap]')

function changeImage(elmnt, value) {
    a = value;
    if (a === "Flask") {
        swal("Flask is a minimalistic python framework for building web apps (a light weight server). It makes development faster by offering code for all sorts of processes like database interaction or file activity")
    } else if (a === "JSON") {
        swal("JSON Stands for JavaScript Object Notation.  It is a lightweight format for storing and transporting data, often used when data is sent from a server to a web page");
    } else if (a === "SQLAlchemy") {
        swal("SQLAlchemy is an open source SQL toolkit and object-relational mapper (ORM) for Python.  Basically it allows Python to talk to SQL, providing efficient and high-performing database access");
    } else if (a === "HTML") {
        swal("HTML describes the content of a webpage and CSS is used to specify its style.  JavaScript transforms the HTML body from being a beautifully dressed CSS styled mannequin into a real-life walking talking human being");
    } else if (a === "PostgreSQL") {
        swal("PostgreSQL is a powerful, open source object-relational database system using SQL language combined with features that safely store and scale the most complicated data workloads");
    } else if (a === "CSV") {
        swal("CSV files are Comma Separated Values files. Being structured in a tabular form makes them easy to use for importing and exporting large datasets.  This makes them great for website developers who exchange large amounts of data between different applications.  This is why we used CSV files for our input into and output from pandas, as well as for our input into our PostgreSQL database");
    } else if (a === "Pandas") {
        swal("Pandas is an open-source data analysis module for Python.  It is used in a wide range of fields including academia, finance, economics, statistics and analytics as it offers high-performing data analysis tools and easy to use data structures.  We used pandas to perform the transformations on our source data");
    } else if (a === "Excel") {
        swal("Excel is a spreadsheeting tool that features calculation, graphing tools, pivot tables, and a macro programming language called Visual Basic for Applications");
    } else if (a === "UNats") {
        swal("The United Nations provided our datasets.  They are an international organization of countries set up in 1945 to promote international peace, security, and cooperation");
    } else if (a === "Arrow1") {
        swal("We used Flask as our server to create multiple variable routes for the results of our database queries.  Data from these routes is used to build the data visualisations in the main dashboard");
    } else if (a === "Arrow2") {
        swal("With SQLAlchemy we sent the results of our database queries in JSON format back to our server");
    } else if (a === "Arrow3") {
        swal("We used SQLAlchemy to create the database using Python code and the CSV files exported from pandas");
    } else if (a === "Arrow4") {
        swal("We used SQLAlchemy to query the database using SQL select statements in our Python code");
    } else if (a === "Arrow5") {
        swal("We used SQLAlchemy to access and set up our PostgreSQL database");
    } else if (a === "Arrow6") {
        swal("We generated 4 CSV files, one for each table in our PostgreSQL database");
    } else if (a === "Arrow7") {
        swal("We used 3 data sets from the United Nations population prospects 2019 report.  Our population data set was a CSV file and our demographics and country/geography data were in Excel spreadsheets.  All were imported into Pandas");
    } else {
        swal("SQLAlchemy sends back the results of our database queries in JSON format");

    }
};