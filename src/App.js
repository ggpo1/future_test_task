import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import GridView from './components/GridView';
import { TestRowsList } from './data/TestData';
import Api from './api/Api';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await Api.getSmallData();
      setData(data);
    })();
  }, []);

  return (
    <div className="App">
      <GridView dataSource={data} width={'80'} height={'70'} />
    </div>
  );
}

export default App;
