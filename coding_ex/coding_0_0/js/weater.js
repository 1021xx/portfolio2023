(() => {
  const weatherInfo = document.querySelector(".weatherInfo");
  const weatherIcon = document.querySelector(".weatherIcon");
  const weatherSource = document.querySelector(".weather-source");

  const conditions = [
    [[0], "Clear", "☀️"],
    [[1, 2], "Partly cloudy", "⛅"],
    [[3], "Overcast", "☁️"],
    [[45, 48], "Fog", "🌫️"],
    [[51, 53, 55], "Drizzle", "🌦️"],
    [[56, 57], "Freezing drizzle", "🌧️"],
    [[61, 63, 65, 80, 81, 82], "Rain", "🌧️"],
    [[66, 67], "Freezing rain", "🌧️"],
    [[71, 73, 75, 77, 85, 86], "Snow", "🌨️"],
    [[95, 96, 99], "Thunderstorm", "⛈️"],
  ];

  function showUnavailable() {
    weatherInfo.textContent = "Weather unavailable";
  }

  async function showWeather({ coords }) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.search = new URLSearchParams({
      latitude: coords.latitude,
      longitude: coords.longitude,
      current: "temperature_2m,weather_code,is_day",
      forecast_days: "1",
    });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        showUnavailable();
        return;
      }

      const { current } = await response.json();
      if (!Number.isFinite(current?.temperature_2m)) {
        showUnavailable();
        return;
      }

      const condition = conditions.find(([codes]) => codes.includes(current.weather_code));
      const [, description, icon] = condition ?? [[], "Current weather", ""];
      weatherIcon.textContent = current.weather_code === 0 && current.is_day === 0 ? "🌙" : icon;
      weatherInfo.textContent = `${description}, ${Math.round(current.temperature_2m)}°C`;
      weatherSource.hidden = false;
    } catch {
      showUnavailable();
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showUnavailable, { timeout: 10000 });
  } else {
    showUnavailable();
  }
})();
