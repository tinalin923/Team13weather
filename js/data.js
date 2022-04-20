let data;
let locationIds = [
  { 新竹縣: "hsinchu" },
  { 金門縣: "kinmen" },
  { 苗栗縣: "miaoli" },
  { 新北市: "new-taipei-city" },
  { 宜蘭縣: "yilan" },
  { 雲林縣: "yunlin" },
  { 臺南市: "tainan-city" },
  { 高雄市: "kaohsiung-city" },
  { 彰化縣: "changhua" },
  { 臺北市: "taipei-city" },
  { 南投縣: "nantou" },
  { 澎湖縣: "penghu" },
  { 基隆市: "keelung-city" },
  { 桃園市: "taoyuan-city" },
  { 花蓮縣: "hualien" },
  { 連江縣: "lienchiang" },
  { 臺東縣: "taitung" },
  { 嘉義市: "chiayi-city" },
  { 嘉義縣: "chiayi" },
  { 屏東縣: "pingtung" },
  { 臺中市: "taichung-city" },
  { 新竹市: "hsinchu-city" },
];

const getWeather = async () => {
  let url = new URL(
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091"
  );

  let params = {
    Authorization: "CWB-86C9D75F-84B8-4ADB-9B46-3427C1205CE0",
    elementName: ["Wx", "PoP12h", "MinT", "MaxT", "UVI"],
  };

  url.search = new URLSearchParams(params).toString();

  let response = await fetch(url).then((res) => res.json());
  return response;
};

const parseWeatherData = (response, locationIds) => {
  let info = response.records.locations[0].location;
  data = [];
  for (let i = 0; i < info.length; i++) {
    let locationName = info[i].locationName;
    let matchlocation = locationIds.filter(
      (obj) => Object.keys(obj) == locationName
    )[0];
    let locationId = Object.values(matchlocation)[0];
    let PoP = info[i].weatherElement[0].time[0].elementValue[0].value;
    let Wx = info[i].weatherElement[1].time[0].elementValue[0].value;
    let MinT = info[i].weatherElement[2].time[0].elementValue[0].value;
    let MaxT = info[i].weatherElement[4].time[0].elementValue[0].value;
    let UVIndexValue = info[i].weatherElement[3].time[0].elementValue[0].value;
    let exposureLevelValue =
      info[i].weatherElement[3].time[0].elementValue[1].value;

    let weatherInfo = {
      id: locationId,
      location: locationName,
      weather: Wx,
      rainProbability: PoP,
      minTemperature: MinT,
      maxTemperature: MaxT,
      UVIndex: UVIndexValue,
      exposureLevel: exposureLevelValue,
    };
    data.push(weatherInfo);
  }
  return data;
};

const showWeather = (event, data) => {
  let divId = event.currentTarget.id;
  let singleLocationData = data.filter((obj) => obj.id == divId)[0];
  const weatherDiv = document.getElementById("weatherDiv");
  weatherDiv.style.visibility = "visible";
  const weatherDesDiv = document.getElementById("weatherDescriptionDiv");
  let location = document.createElement("h2");
  location.textContent = singleLocationData.location;
  weatherDesDiv.appendChild(location);
  let weatherP = document.createElement("p");
  weatherP.textContent = "天氣： " + singleLocationData.weather;
  weatherDesDiv.appendChild(weatherP);
  let PoP = document.createElement("p");
  PoP.textContent = "降雨機率： " + singleLocationData.rainProbability + " %";
  weatherDesDiv.appendChild(PoP);
  let temperature = document.createElement("p");
  temperature.textContent =
    "氣溫： " +
    singleLocationData.minTemperature +
    " ~ " +
    singleLocationData.maxTemperature;
  weatherDesDiv.appendChild(temperature);
  let UVI = document.createElement("p");
  UVI.textContent =
    "紫外線指數： " +
    singleLocationData.UVIndex +
    `  ${singleLocationData.exposureLevel}`;

  weatherDesDiv.appendChild(UVI);
};
const removeWeather = (event) => {
  const weatherDesDiv = document.getElementById("weatherDescriptionDiv");
  const weatherDiv = document.getElementById("weatherDiv");
  weatherDiv.style.visibility = "hidden";
  while (weatherDesDiv.firstChild) {
    weatherDesDiv.removeChild(weatherDesDiv.firstChild);
  }
};

const renderWeatherData = (locationIds, data) => {
  locationIds.forEach((element) => {
    let item = document.getElementById(`${Object.values(element)[0]}`);
    item.addEventListener("mouseenter", (event) => showWeather(event, data));
    item.addEventListener("mouseout", removeWeather);
  });
};

const init = async () => {
  let response = await getWeather();
  parseWeatherData(response, locationIds);
  renderWeatherData(locationIds, data);
};
init();
