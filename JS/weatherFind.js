function live_location() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            console.log(lat, long);

            const URL_Location = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=0d7e0434effa4ea3825e16245d95ba24`;

            console.log("Location:-" + URL_Location);
            getLoc(URL_Location);
        });
    }
};
live_location();





let city;
let county;
let modifiedCity = "";
let cityIndiaCheckVar = 1;
let data_Weather;

async function getLoc(URL_Location) {

    try {
        let response_Location = await fetch(URL_Location);

        let data_Location = await response_Location.json();
        console.log(data_Location);

        //  country = data_Location.features[0].properties.country;
        //     statename = data_Location.features[0].properties.state;
        city = data_Location.features[0].properties.city;
        county = data_Location.features[0].properties.county;
        //     street = data_Location.features[0].properties.street;
        //     postCode = data_Location.features[0].properties.postcode;
        //     address = data_Location.features[0].properties.formatted;
        //     timeZone = data_Location.features[0].properties.timezone;
        // console.log(city);
        checkCity(city);
    } catch (error) {
        console.error(error);
    }

}



function checkCity(city) {
    modifiedCity = "";
    for (i = 0; i < city.length; i++) {
        if (city[i] === " ") {
            weatherAPI(modifiedCity)
            break;
        }

        modifiedCity += city[i];
        if (i === city.length - 1) {
            weatherAPI(modifiedCity)
            break;
        }
    }
}


let cityNameInHtml = document.querySelector(".content .leftContent .placeAndFontAwesome .placeDateTime h1 ");
let tempInHtml = document.querySelector(".content .leftContent .currentTemp h1");
let searchCityInHtml = document.querySelector("header .search input");

let tempMessageInHtml = document.querySelector(".content .rightContent .otherWeatherDetails h3")
let tempInFInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .tempInF");
let windKmphInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .windKmph");
let cloudyInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .cloudy");
let humadityInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .humadity");
let airQualityInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .airQuality");
let localTimeInHtml = document.querySelector(".content .rightContent .otherWeatherDetails .rightContentItem .rightContentItemValue .localTime");

async function weatherAPI(city) {
    const URL_Weather = `https://api.weatherapi.com/v1/current.json?key=62a777c745184a0fa8085854241306&q=${city}&aqi=yes`;


    let response = await fetch(URL_Weather);
    console.log("Weather:-" + URL_Weather);

    data_Weather = await response.json();

    console.log(data_Weather);

    if (cityIndiaCheckVar === 1) {
        cityIndiaCheckVar -= 1;
        cityIndiaCheck();

    }

    if (response.ok) {
        cityNameInHtml.innerHTML = `${city}`;
        tempInHtml.innerHTML = `${data_Weather.current.temp_c}°C`;

        tempMessageInHtml.innerHTML = `${data_Weather.current.condition.text}`;
        tempInFInHtml.innerHTML = `${data_Weather.current.temp_f}°F`;
        windKmphInHtml.innerHTML = `${data_Weather.current.wind_kph}Km/h`;
        cloudyInHtml.innerHTML = `${data_Weather.current.cloud}%`;
        humadityInHtml.innerHTML = `${data_Weather.current.humidity}%`;
        airQualityInHtml.innerHTML = `${data_Weather.current.air_quality["us-epa-index"]}`;
        localTimeInHtml.innerHTML = `${data_Weather.location.localtime}`;
    }

};

function callWeatherApiByButton() {
    if (searchCityInHtml.value == "Current Location") {
        live_location();
        return;
    }
    cityNameToSearch = searchCityInHtml.value;
    cityIndiaCheckVar = 0;
    checkCity(cityNameToSearch)
}

function callWeatherApiByEnter(event) {
    if (event.key === "Enter") {
        callWeatherApiByButton();
    }
}

function cityIndiaCheck() {
    if (data_Weather.location.country !== "India") {
        city = county;
        checkCity(city)
        console.log(county);
    }
}

// console.log(cities);




let citiesList = document.querySelector("#citiesList");

cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citiesList.appendChild(option);
})