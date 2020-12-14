import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';


function App() {

      //Form state
  const [search, saveSearch] = useState({
    city:'',
    country:''
  })

  const [consult, setConsult] = useState(false);

  const [result, setResult] = useState({});

  const [error, setError] = useState(false)


  const {city, country} = search;

  useEffect(() => {
    const APIget = async () => {
      if(consult){
        const APIkey = '26735b9bb4a1563d0ff75a1154fba271'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;
  
        const APIresponse = await fetch(url);
        const APIresult = await APIresponse.json();

        console.log(APIresult)
  
        setResult(APIresult);
        setConsult(false);

        if(APIresult.cod === '404'){
          setError(true);
        } else {
          setError(false);
        }
      }
    }
    APIget();
    //eslint-disable-next-line
  }, [consult]);

  let component;
  if(error){
    component = <Error 
                  msg='No results'
                />
  } else{
    component = <Weather
                  result={result}
                />
  }

  return (
    <Fragment>
      <Header
        title='Weather app'
      />
      <div className='contenedor-form'>
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                saveSearch={saveSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
