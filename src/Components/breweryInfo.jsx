import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Breweries() {
  const [breweries, setBreweries] = useState([]);
  const [filterName, setFilterName] = useState(''); // State to store the name filter input
  const [selectedState, setSelectedState] = useState(''); // State to store the selected state

  const usStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", 
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", 
  "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await axios.get('https://api.openbrewerydb.org/breweries?per_page=8000');
        setBreweries(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchBreweries();
  }, []);

  const handleNameChange = (event) => {
    setFilterName(event.target.value.toLowerCase()); // Convert input to lower case for case-insensitive comparison
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  // Filter breweries based on name and state input
  const filteredBreweries = breweries.filter(brewery => {
    const matchesName = brewery.name.toLowerCase().includes(filterName);
    const matchesState = selectedState ? brewery.state === selectedState : true;
    return matchesName && matchesState;
  });

  return (
    <div className="container">
      <div className="filter">
        <label htmlFor="name-input">Filter by Name:</label>
        <input
          id="name-input"
          type="text"
          placeholder="Enter Brewery Name"
          value={filterName}
          onChange={handleNameChange}
        />
        <label htmlFor="state-select">Filter by State:</label>
        <select id="state-select" value={selectedState} onChange={handleStateChange}>
          <option value="">All States</option>
          {usStates.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <ul className="breweries-list">
        <li className="header-row">
          <div className="header name">Brewery Name</div>
          <div className="header location">Location</div>
          <div className="header type">Type</div>
        </li>
        {filteredBreweries.map((brewery, index) => (
          <li key={index} className="brewery-row">
            <div className="column name">
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.name}</a>
            </div>
            <div className="column location">{`${brewery.city}, ${brewery.state}`}</div>
            <div className="column type">{brewery.brewery_type}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breweries;