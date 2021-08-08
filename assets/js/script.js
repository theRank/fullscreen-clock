function get_query_variable(variable) {
  let reg = new RegExp("(^|&)" + variable + "=([^&]*)(&|$)", "i");
  let pair = window.location.search.substr(1).match(reg);
  if (pair != null) {
    return decodeURIComponent(pair[2]);
  }
  return null;
}

function update_time(week_id, date_id, time_id) {
  let date = new Date();

  let yr = date.getFullYear();
  let mo = date.getMonth() + 1;
  let day = date.getDate();
  let wk = date.getDay();

  let h = ("0" + date.getHours()).slice(-2);
  let m = ("0" + date.getMinutes()).slice(-2);
  let s = ("0" + date.getSeconds()).slice(-2);

  let week_text = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][wk];
  let date_text = yr + "-" + mo + "-" + day;
  let time_text = h + ":" + m;

  if (get_query_variable("debug")) {
    console.log(yr + "-" + mo + "-" + day + ", " + h + ":" + m + ":" + s);
  }

  document.getElementById(week_id.id).innerHTML = week_text;
  document.getElementById(date_id.id).innerHTML = date_text;
  document.getElementById(time_id.id).innerHTML = time_text;
}

window.addEventListener("load", function () {
  let page = document.getElementById("wrapper");

  let fg_color = get_query_variable("fg");
  if (fg_color != null) {
    page.style.setProperty("color", "#" + fg_color);
  } else {
    page.style.setProperty("color", "#f8f9fa");
  }

  let bg_color = get_query_variable("bg");
  if (bg_color != null) {
    page.style.setProperty("background-color", "#" + bg_color);
  } else {
    page.style.setProperty("background-color", "#212529");
  }

  update_time(week, date, time);

  let interval = get_query_variable("int");
  if (!isNaN(interval) && !isNaN(parseInt(interval))) {
    setInterval("update_time(week, date, time)", parseInt(interval));
  } else {
    setInterval("update_time(week, date, time)", 1000);
  }

  let rotation = get_query_variable("rot");
  if (["180", "90", "-90", "270"].includes(rotation)) {
    let rot = "rotate(" + rotation + "deg)";

    page.style.setProperty("transform", rot);
    page.style.setProperty("-webkit-transform", rot);

    if (rotation == "90") {
      page.style.setProperty("transform-origin", "bottom left");
      page.style.setProperty("-webkit-transform-origin", "bottom left");
      page.style.setProperty("position", "absolute");
      page.style.setProperty("top", "-100vw");
      page.style.setProperty("height", "100vw");
      page.style.setProperty("width", "100vh");
    }

    if (rotation == "-90" || rotation == "270") {
      page.style.setProperty("transform-origin", "bottom right");
      page.style.setProperty("-webkit-transform-origin", "bottom right");
      page.style.setProperty("position", "absolute");
      page.style.setProperty("top", "-100vw");
      page.style.setProperty("left", "calc(100vw - 100vh)");
      page.style.setProperty("height", "100vw");
      page.style.setProperty("width", "100vh");
    }
  }

  let special = get_query_variable("sp");
  if (special == "hmsColor") {
    sp_hms_color(page);
    setInterval("sp_hms_color(page)", 1000);
  }
});

function sp_hms_color(element) {
  let date = new Date();

  let h = ("0" + date.getHours()).slice(-2);
  let m = ("0" + date.getMinutes()).slice(-2);
  let s = ("0" + date.getSeconds()).slice(-2);

  let time_color = "#" + h + m + s;
  element.style.setProperty("background-color", time_color, "important");

  if (get_query_variable("debug")) {
    console.log("Background color:", time_color);
  }
}
