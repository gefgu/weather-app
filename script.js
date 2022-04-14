(() => {
  async function getData(location) {
    const apiID = "9426f14f9c66ae5af9513a6760935f0f";
    const requestLink = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiID}`;
    const response = await fetch(requestLink);
    const data = await response.json();
    console.log(data);
    return data;
  }

  function processData(rawData) {
    const weatherData = rawData.main;
    return weatherData;
  }

  getData("London").then((response) => {
    console.log(processData(response));
  });
})();
