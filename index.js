var soleado = 113
var nublado = [116, 119, 122, 143, 248, 260, 200]
var lluvia = [176, 185, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311]

function clima() {
    if ($('#main_page')) {
        navigator.geolocation.getCurrentPosition(function (p) {
            var lat;
            var lon;
            lat = p.coords.latitude;
            lon = p.coords.longitude;
            llamado(lat, lon);
        })

    }
}

function llamado(lat, lon) {
    $.get({
        url: 'http://api.weatherstack.com/current',
        data: {
            access_key: 'a2acbc81e3d7e513bf9de9b23ba348a5',
            query: lat + ', ' + lon,
            units: 'm'
        },
        datatype: 'json',
        success: function (response) {
            console.log(response);
            manejo_respuesta(response.location, response.current);
        }
    })
}

function manejo_respuesta(locacion, clima){
    $("#w-cont").addClass("weather-cont");
    $(".weather").prepend("<h3>Clima Actual</h3>");
    $("#ubicacion").append("<h5>Ubicación: <i class='fas fa-map-marker-alt fa-2x location'></i></h5> <h6>" 
    + locacion.name + ", " + locacion.region + "</h6> ");

    var icon;

    if (clima.weather_code === soleado){
        if (clima.is_day === "yes"){
            icon = '<h5>Soleado <i class="fas fa-sun fa-2x sun"></i></h5>';
        }
        else{
            icon = '<h5>Despejado <i class="fas fa-moon fa-2x moon"></i></h5>';
        }
        
    }
    else if(nublado.includes(clima.weather_code)){
        icon = '<h5>Nublado <i class="fas fa-cloud fa-2x cloud"></i></h5>';
    }
    else if(lluvia.includes(176)){
        icon = '<h5>Lluvia <i class="fas fa-cloud-showers-heavy fa-2x"></i></h5>';
    }

    $("#tiempo").append(icon + '<h6>Temperatura: ' + clima.temperature + '˚C</h6>');
}

clima();