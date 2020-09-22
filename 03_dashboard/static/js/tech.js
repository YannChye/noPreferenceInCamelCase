ImageMap('img[usemap]')

function changeImage(elmnt, value) {
    console.log(value);
    a = value;
    if (a === "Flask") {
        swal("Flask is a minimalistic python framework for building web apps. It makes development faster by offering code for all sorts of processes like database interaction or file activity")
    } else if (a === "JSON") {
        swal("JSON Stands for JavaScript Object Notation.  It is a lightweight format for storing and transporting data, often used when data is sent from a server to a web page");
    } else if (a === "SQLAlchemy") {
        swal("SQLAlchemy is an open source SQL toolkit and object-relational mapper (ORM) for Python.  It provides efficient and high-performing database access");
    } else if (a === "HTML") {
        swal("HTML describes the content of a webpage and CSS is used to specify its style.  JavaScript it transforms the HTML body from being a beautifully dressed CSS styled mannequin into a real-life walking talking human being");
    } else if  (a === "PostgreSQL") {
        swal("PostgreSQL is a powerful, open source object-relational database system using SQL language combined with features that safely store and scale the most complicated data workloads");
    } else if  (a === "Arrow1") {
        swal("Arrow1 data");
    } else if  (a === "Arrow2") {
        swal("Arrow2 data");
    } else if  (a === "Arrow3") {
        swal("Arrow3 dataPostgres by default");
    } else if  (a === "Arrow4") {
        swal("Arrow4 data");
    } else {
        swal("Arrow5 data");
        
    }
};