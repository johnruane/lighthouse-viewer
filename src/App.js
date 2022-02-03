import React, {useEffect, useState} from 'react';
import Table from './Table';
import { processData, flattenArray } from './lib/helpers';
import './App.css';

function App() {
  const [stats, setStats] = useState();

  const getData = async (url) => {
    const data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
    return data;
  }

  const getLighthouseBuildData = async () => {
    const buildData = await getData('https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds');
    const buildIds = [buildData[0].id, buildData[1].id];

    const statData = await getData(`https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds/${buildIds[0]}/statistics`);
    const prevData = await getData(`https://lighthouse-server.qa.reactweb-dev.digital.nbrown.co.uk/v1/projects/6199e92f-0187-4464-b628-9526001444f9/builds/${buildIds[1]}/statistics`);

    const processedStats = flattenArray(processData(statData), 'current');
    const processedPrev = flattenArray(processData(prevData), 'prev');

    setStats(processedStats.map(v => ({ ...v, ...processedPrev.find(sp => sp.name === v.name) })));
  }

  useEffect(() => {
    getLighthouseBuildData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {stats ? (
        <Table stats={stats}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
