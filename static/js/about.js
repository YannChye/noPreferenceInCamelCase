function speech(variable) {
    var x = document.getElementsByClassName(variable.alt.toLowerCase());
    if (x[0].style.display === "none") {
    x[0].style.display = "block";
  } else {
    x[0].style.display = "none";
  }
      }
