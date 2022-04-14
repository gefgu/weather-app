(() => {
  async function getRawData(location) {
    const apiID = "9426f14f9c66ae5af9513a6760935f0f";
    const requestLink = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiID}`;
    const response = await fetch(requestLink);
    const data = await response.json();
    return data;
  }

  function processData(rawData) {
    // console.log(rawData);
    const weatherData = {
      ...rawData.main,
      description: rawData.weather[0].description,
      name: rawData.name,
      wind: rawData.wind,
      sunrise: rawData.sys.sunrise,
      sunset: rawData.sys.sunset,
      timezone: rawData.timezone,
    };
    return weatherData;
  }

  const displayController = (() => {
    let cityName = "London";

    async function buildPage() {
      const raw = await getRawData(cityName);
      const data = processData(raw);
      console.log(data);
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const locationInput = form.querySelector("#location-search");
      cityName = locationInput.value;
      buildPage();
    });
    buildPage();
  })();
})();
