API = "pk.eyJ1Ijoic2F2ZWRieWplc3VzIiwiYSI6ImNrN3pkM3lmNDAzY3kzZG80eTZwemt1OWEifQ.Bh2HyDy2oZmziSaUT55O0g"
var quake_link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
var geolink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
var tectonicplates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();
d3.json(geolink, function (data) {
    createFeatures(data.features);
});

function createFeatures(geoinfo) {


    function onEachFeature(feature, layer) {
        layer.bindPopup("<strong><h1>LOCATION</h1></strong>" + feature.properties.place +
            "<strong><h2>MAGNITUDE</h2></strong>" + (feature.properties.mag));
    }


    var geolayer = L.geoJSON(geoinfo, {
        onEachFeature: onEachFeature
    });

    createMap(geolayer);
}







function createMap(geolayer) {

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API
    });

    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API
    });
    var wildside = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API
    });
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-satellite",
        accessToken: API
    });

    var baseMaps = {
        "STREET MAP": streetmap,
        "DARK MAP": darkmap,
        "WILD MAP": wildside,
        "SAT MAP": satellitemap
    };



    var overlayMaps = {
        Earthquakes: geolayer,

    };

    var myMap = L.map("map", {
        center: [
            30.0131, -30.0131
        ],
        zoom: 2,
        layers: [streetmap, geolayer]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

