const weather = document.querySelector(".js-weather"),
    API_KEY = "f4dd1d833b64c9a39c89f99743926856",
    COORDS = "coords",
    weatherIcon = document.querySelector(".weather_icon"),
    geoInfo = document.querySelector(".location");

function getWeather(lat, lon) {
    // fetch안에는 가져올 데이터가 들어가면 된다.
    fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log("json info:", json);
            const temperature = json.main.temp;
            const place = json.name;
            const lon = json.coord.lon;
            const lat = json.coord.lat;
            const icon = json.weather[0].icon;
            weather.innerText = `${place} / ${temperature}°C `;

            weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            geoInfo.textContent = `Longitude : ${lon}, Latitude: ${lat}`;
        });
    // then()은 데이터가 완전히 들어온 다음에 호출하는 부분
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    console.log("GeoLocation :" + position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function getCoordsInfo() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        getCoordsInfo();
    } else {
        // getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();