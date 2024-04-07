import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Breweries() {
  const [breweries, setBreweries] = useState([]);
  const [breweryOfTheWeek, setBreweryOfTheWeek] = useState(null);
  const [averageMicro, setAverageMicro] = useState(0);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const totalBrew = await axios.get('https://api.openbrewerydb.org/breweries/meta');
        const randBrew = await axios.get('https://api.openbrewerydb.org/breweries?per_page=8000');
        const micro = await axios.get('https://api.openbrewerydb.org/v1/breweries/meta?by_type=micro');
        const brewpub = await axios.get('https://api.openbrewerydb.org/v1/breweries/meta?by_type=brewpub');
        const large = await axios.get('https://api.openbrewerydb.org/v1/breweries/meta?by_type=large');
        const responses = await Promise.all([totalBrew, randBrew, micro, brewpub, large]);
        setAverageMicro(Math.round((responses[2].data.total / responses[0].data.total) * 100));
        setBreweries(responses[0].data);
        setBreweryOfTheWeek(responses[1].data[Math.floor(Math.random() * responses[1].data.length)]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBreweries();
  }, []);

  return (
    <div>
      <div className="info-containers">
        <div className="info-box">
          <p>Total Breweries 🍺</p>
          <p>{breweries.total}</p>
        </div>
        <div className="info-box">
          <p>Average Type Breweries 🏫</p>
          <p>Micro Brew: {averageMicro}%</p>
        </div>
        <div className="info-box">
          <p>Brewery of the Week 🎉</p>
          <a href={breweryOfTheWeek ? breweryOfTheWeek.website_url : '#'} target="_blank" rel="noopener noreferrer">
          <p>{breweryOfTheWeek ? breweryOfTheWeek.name : 'Loading...'}</p>
          </a>
        </div>
      </div>

      <ul className="breweries-list">
        {/* Brewery list rendering as before */}
      </ul>
    </div>
  );
}

export default Breweries;
