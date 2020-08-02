import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import GridView from './components/GridView';
import ContentViewer from './components/ContentViewer';
import { TestRowsList } from './data/TestData';
import Api from './api/Api';

function App() {
  const [data, setData] = useState([]),
    [selectedItem, setSelectedItem] = useState({}),
    [isLoader, setIsLoader] = useState(false),
    [isAsking, setIsAsking] = useState(true);

  useEffect(() => {
    
  }, []);

  const contentSelectCallback = (item) => setSelectedItem(item);

  let contentTyper = (selected) => {
    let blocks = [];
    blocks.push(<div key={'user-block'} className={'content-viewer-row'}><span>Выбран пользователь <b>{selected.firstName} {selected.lastName}</b></span></div>);
    blocks.push(
      <div key={'description-block'} className={'content-viewer-row-column'}>
        <div style={{ height: 'auto' }}>Описание:</div>
        <textarea readOnly>{selected.description}</textarea>
      </div>
    );
    blocks.push(<div key={'address-block'} className={'content-viewer-row'}><span>Адрес проживания: <b>{selected.address.streetAddress}</b></span></div>);
    blocks.push(<div key={'city-block'} className={'content-viewer-row'}><span>Город: <b>{selected.address.city}</b></span></div>);
    blocks.push(<div key={'state-block'} className={'content-viewer-row'}><span>Провинция/штат: <b>{selected.address.state}</b></span></div>);
    blocks.push(<div key={'zip-block'} className={'content-viewer-row'}><span>Индекс: <b>{selected.address.zip}</b></span></div>);


    return blocks;
  }

  let askAction = (type) => {
    setIsAsking(false);
    setIsLoader(true);
    (async () => {
      let data = [];
      if (type === 'high') {
        data = await Api.getLargeData();
      } else {
        data = await Api.getSmallData();
      }
      setData(data);
      setIsLoader(false);
    })();
  }

  if (isAsking) {
    return (
      <div className={'ask-block'}>
        <button onClick={() => askAction('low')}>Маленький объем данных</button>
        <button onClick={() => askAction('high')}>Большой объем данных</button>
      </div>
    );
  }
  
  if (isLoader) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        загрузка...
      </div>
    );
  }

  return (
    <div className="App">
      <GridView
        itemSelectAction={contentSelectCallback}
        dataSource={data}
        limit={30}
        width={'100'}
        height={'70'}
      />
      <div className={'content-viewer'}>
        <ContentViewer typer={contentTyper} selected={selectedItem} />
      </div>
    </div>
  );
}

export default App;
