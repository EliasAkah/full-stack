const btnEl = document.getElementsByTagName("button")[0];
const pHumidityEl = document.querySelector(".humidity");
const pWindEl = document.querySelector(".wind");
const h1 = document.querySelector(".temp");
const h2 = document.querySelector(".city");
const inputEl = document.getElementsByTagName("input")[0];
const weatherImg = document.querySelector(".weather-icon");
const weatherEl = document.querySelector(".weather");
const divEl = document.querySelectorAll(".col");

weatherEl.style.display = "none";

function getTemperature() {
  const city = inputEl.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae3c29856f0847d01e8feaccdfe6bedd&units=metric`;
  fetch(url, { method: "GET" })
    .then((resp) => resp.json())
    .then((data) => {
      if (city !== "" && data.name) {
        h2.innerText = data.name;
        h1.innerText = `${data.main.temp}°c`;
        pHumidityEl.innerText = `${data.main.humidity}%`;
        pWindEl.innerText = `${data.wind.speed}km/h`;
        let temp = data.main.temp;
        switch (true) {
          case data.weather[0].main === "Rain":
            weatherImg.src = "images/rain.png";
            break;
          case data.weather[0].main === "Clouds":
            weatherImg.src = "images/cloud_sun.png";
            break;
          case data.weather[0].main === "Clear":
            weatherImg.src = "images/sun.png";
            break;
          case data.weather[0].main === "Drizzle":
            weatherImg.src = "images/drizzle.png";
            break;
          case data.weather[0].main === "Snow":
            weatherImg.src = "images/snow.png";
            break;
          case data.weather[0].main === "Mist":
            weatherImg.src = "images/mist.png";
            break;
          default:
            break;
        }
      } else if (data.cod == 404) {
        h2.innerText = data.message;
        divEl.forEach((col) => {
          col.style.display = "none";
        });
        h1.innerText = "";
        divEl.style.display = "none";
        pHumidityEl.innerText = "error";
        pWindEl.innerText = "error";
        weatherImg.src = "images/problem.png";
      }
    });
}

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value) {
    weatherEl.style.display = "block";
    getTemperature();
  }
});

btnEl.addEventListener("click", () => {
  weatherEl.style.display = "block";
  getTemperature();
});
