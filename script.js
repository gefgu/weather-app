(() => {
  async function getRawData(location) {
    const apiID = "9426f14f9c66ae5af9513a6760935f0f";
    const requestLink = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiID}`;
    const response = await fetch(requestLink);
    const data = await response.json();
    return data;
  }

  function processData(rawData) {
    let description = rawData.weather[0].description;
    description = description.split(" ").map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
    const weatherData = {
      ...rawData.main,
      description: description,
      name: rawData.name,
      wind: rawData.wind,
    };
    weatherData.temp = Math.floor(weatherData.temp - 273.15);
    weatherData.feels_like = Math.floor(weatherData.feels_like - 273.15);
    weatherData.temp_min = Math.floor(weatherData.temp_min - 273.15);
    weatherData.temp_max = Math.floor(weatherData.temp_max - 273.15);
    return weatherData;
  }

  const displayController = ((doc) => {
    let cityName = "London";

    async function buildPage() {
      const raw = await getRawData(cityName);
      const data = processData(raw);
      console.log(data);
      doc.querySelector("#weather-description").textContent = data.description;
      doc.querySelector("#location-name").textContent = data.name;

      doc.querySelector(".temperature").textContent = `${data.temp} °C`;
      doc.querySelector(".feels > div").textContent = `${data.feels_like} °C`;
      doc.querySelector(".humidity > div").textContent = `${data.humidity}%`;
      doc.querySelector(".pressure > div").textContent = `${data.pressure} hPa`;
      doc.querySelector(".temp-max > div").textContent = `${data.temp_max} °C`;
      doc.querySelector(".temp-min > div").textContent = `${data.temp_min} °C`;
      doc.querySelector(".wind > div").textContent = `${data.wind.speed} m/s`;
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const locationInput = form.querySelector("#location-search");
      cityName = locationInput.value;
      buildPage();
    });
    buildPage();
  })(document);
})();
