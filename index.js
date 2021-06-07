
// codigos del clima que entrega la API
var soleado = 1000
var nublado = [1003, 1006, 1009, 1030, 1135,  1147, 1087]
var lluvia = [1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
    1201, 1207, 1240, 1243, 1246, 1249, 1252, 1273, 1276]

// función que maneja el clima en general
function clima() {
    navigator.geolocation.getCurrentPosition(function (p) {
        var lat;
        var lon;
        lat = p.coords.latitude;
        lon = p.coords.longitude;
        llamado(lat, lon);
    })
}

//llamado a la API del clima y callback a la funcion que despliega la información en la página
function llamado(lat, lon) {
    $.get({
        url: 'https://api.weatherapi.com/v1/current.json',
        data: {
            key: '672af457a1974972960214033210606',
            q: lat + ", " + lon,
            lang: 'es',
            units: 'metrics'
        },
        datatype: 'json',
        success: function(response){
            console.log(response);
            manejo_respuesta(response.location, response.current)
        }
    })
}

//Función que analiza la respuesta de la API del clima, selecciona los iconos correspondientes y
//lo agrega a la página
function manejo_respuesta(locacion, clima){
    $("#w-cont").addClass("weather-cont");
    $(".weather").prepend("<h3>Clima Actual y Ubicación</h3>");
    $("#ubicacion").append("<h5>Tiempo en: <i class='fas fa-map-marker-alt fa-2x location'></i></h5> <h6>" 
    + locacion.name + ", " + locacion.region + "</h6> ");

    var desc = clima.condition.text;
    var icon;

    if (clima.condition.code === soleado){
        if (clima.is_day === "yes"){
            icon = '<h5>' + desc + ' <i class="fas fa-sun fa-2x sun"></i></h5>';
        }
        else{
            icon = '<h5>' + desc + ' <i class="fas fa-moon fa-2x moon"></i></h5>';
        }
        
    }
    else if(nublado.includes(clima.condition.code)){
        icon = '<h5>' + desc + ' <i class="fas fa-cloud fa-2x cloud"></i></h5>';
    }
    else if(lluvia.includes(clima.condition.code)){
        icon = '<h5>' + desc + ' <i class="fas fa-cloud-showers-heavy fa-2x"></i></h5>';
    }

    $("#tiempo").append(icon + '<h6>Temperatura: ' + clima.temp_c + '˚C</h6>');
}

clima();

//Funcion para la ubicacion en google maps
function myMap() {
    //se solicita la ubicación
    navigator.geolocation.getCurrentPosition(function (p, ) {
        var lat;
        var lon;
        lat = p.coords.latitude;
        lon = p.coords.longitude;
        mapa(lat, lon);
    })

}

//Funcion que crea el mapa con las coordenadas de la API de HTML llamada en la función,
//la agrega al div correspondiente y le agrega el marcador de la ubicacion mas precisa 
function mapa(lat, lon) {
    loc = new google.maps.LatLng(lat, lon);
    var mapProp = {
        center: loc,
        zoom: 15,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    const marker = new google.maps.Marker({
        position: loc,
        map: map,
      });      
}

