import axios from 'axios';

const baseUrl = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let dynamicUrl = baseUrl;

  if (country) {
    dynamicUrl = `${baseUrl}/countries/${country}`;
  }

  try {
    const { data } = await axios.get(dynamicUrl);

    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
    alert('An error occurred, please refresh the page and try again.');
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
    alert('An error occurred, please refresh the page and try again.');
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/countries`);

    const { countries } = data;

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
    alert('An error occurred, please refresh the page and try again.');
  }
};
