function changeImage(elmnt, value) {
    console.log(value);
    a = value;
    if (a === "Flask") {
        swal("Flask data")
    } else if (a === "JSON") {
        swal("JSON data");
    } else if (a === "SQLAlchemy") {
        swal("SQLAlchemy data");
    } else if (a === "Html") {
        swal("Html data");
    } else {
        swal("Postgres by default");
    }
};