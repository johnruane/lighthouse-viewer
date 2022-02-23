/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Table from './Table';
import { cleanBuildData, filterAndGroupData } from './lib/helpers';
import './App.css';

function App() {
  const [filterOption, setfilterOption] = useState('max');

  const [statData, setStatData] = useState();
  const [prevStatData, setPrevStatData] = useState();

  const [filteredData, setFilteredData] = useState();
  const [prevFilteredData, setPrevFilteredData] = useState();

  const [buildId, setBuildId] = useState();
  const [buildUrl, setBuildUrl] = useState();

  const [prevBuildId, setPrevBuildId] = useState();
  const [prevBuildUrl, setPrevBuildUrl] = useState();

  const getData = async (url) => {
    const data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
    return data;
  }
  
  const handleChange = (changeEvent) => {
    setfilterOption(changeEvent.target.value);
  };

  useEffect(() => {
    const fetchBuildData = async () => {
      const buildData = await getData('https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds');

      const currentBuildData = await getData(`https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds/${buildData[0].id}/statistics`);
      const previousBuildData = await getData(`https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds/${buildData[1].id}/statistics`);

      setBuildId(buildData[0].hash.slice(0, 8));
      setBuildUrl(buildData[0].externalBuildUrl);

      setPrevBuildId(buildData[1].hash.slice(0, 8));
      setPrevBuildUrl(buildData[1].externalBuildUrl);

      // Stat data contains min, max, median data. Set this so that can access the data again when the filter changes
      setStatData(cleanBuildData(currentBuildData));
      // Filter data is just the entries that match the current filter option ie min, max, median that we pass to the table
      setFilteredData(filterAndGroupData(currentBuildData, filterOption));
      // Same as above but for the previous build
      setPrevStatData(cleanBuildData(previousBuildData));
      setPrevFilteredData(filterAndGroupData(previousBuildData, filterOption));
    }
    fetchBuildData();
  }, [])

  useEffect(() => {
    if (!statData) return;
    setFilteredData(filterAndGroupData(statData, filterOption));
    setPrevFilteredData(filterAndGroupData(prevStatData, filterOption));
  }, [filterOption]);

  return (
    <div className="App">
      <form className="container">
        <div className="radio">
          <input id="radio-1" type="radio" name="radio" value="max" checked={filterOption === 'max'} onChange={handleChange} />
          <label className="radio-label" htmlFor="radio-1">Max</label>
        </div>
        <div className="radio">
          <input id="radio-2" type="radio" name="radio" value="min" checked={filterOption === 'min'} onChange={handleChange} />
          <label className="radio-label" htmlFor="radio-2">Min</label>
        </div>
        <div className="radio">
          <input id="radio-3" type="radio" name="radio" value="median" checked={filterOption === 'median'} onChange={handleChange} />
          <label className="radio-label" htmlFor="radio-3">Median</label>
        </div>
      </form>
      {filteredData ? (
        <Table data={filteredData} prev={prevFilteredData}/>
      ) : (
        <p>Loading...</p>
      )}
      <h4 className="build-data-heading">Current Build</h4>
      <p className="build-data">Build ID: {buildId}</p>
      <p className="build-data">Build URL: <a href={buildUrl} target="_blank" rel="noreferrer">{buildUrl}</a></p>
      <h4 className="build-data-heading">Previous Build</h4>
      <p className="build-data">Build ID: {prevBuildId}</p>
      <p className="build-data">Build URL: <a href={prevBuildUrl} target="_blank" rel="noreferrer">{prevBuildUrl}</a></p>
    </div>
  );
}

export default App;
