import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import HeaderIcons from './HeaderIcons';
import { sortData, prettyPrintStat, capitalizeFirstLetter } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['global']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.5085, lng: 8.7832 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  const [themeType, setThemeType] = useState('light');

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches ? setThemeType('dark') : setThemeType('light');
  }, []);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //Code inside runs only once

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setTableData(sortData(data));
          setCountries(countries);
          setMapCountries(data);
          ;
        });
    }

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'global' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (countryCode === 'global') {
          setMapCenter({ lat: 34.5085, lng: 8.7832 });
          setMapZoom(2);
        }
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }

      });
  }

  const onThemeChange = (selectedThemeType) => {
    debugger;
    selectedThemeType === 'light' ? setThemeType('dark') : setThemeType('light');

  }

  return (
    <div className={`app ${themeType === 'dark' ? "app__dark" : ''}`}>
      <div className="app__left">
        <div className="app__header">
          <div className={`app__headerBar ${themeType === 'dark' ? "app__headerBar__dark" : ''}`}>
            <h1 className={`app__headerTitle app__commonFloatClass ${themeType === 'dark' ? "app__headerTitle__dark" : ''}`}>COVID-19 Tracker</h1>
            <HeaderIcons onClick={onThemeChange} themeType={themeType} />
          </div>

          <FormControl className={`app__dropdown ${themeType === 'dark' ? "app__dropdown__dark" : ''}`}>
            <Select className={`app__dropdownSelect ${themeType === 'dark' ? "app__dropdownSelect__dark" : ''}`} variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem className={`app__dropdownSelect__MenuItem ${themeType === 'dark' ? "app__dropdownSelect__MenuItem__dark" : ''}`} value="global"><FontAwesomeIcon className={`app__dropdownSelect__globalIcon ${themeType === 'dark' ? "app__dropdownSelect__globalIcon__dark" : ''}`} icon={faGlobe} />&nbsp;&nbsp;Global</MenuItem>
              {countries.map(country => (<MenuItem className={`app__dropdownSelect__MenuItem ${themeType === 'dark' ? "app__dropdownSelect__MenuItem__dark" : ''}`} value={country.value}><img alt='' src={'https://www.countryflags.io/' + country.value + '/flat/16.png'}></img>&nbsp;&nbsp;{country.name}</MenuItem>))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox themeType={themeType} casesType='cases' active={casesType === 'cases'} onClick={e => setCasesType('cases')} title="Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>

          <InfoBox themeType={themeType} casesType='recovered' active={casesType === 'recovered'} onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>

          <InfoBox themeType={themeType} casesType='deaths' active={casesType === 'deaths'} onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
        </div>

        <div className="app_map">
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}></Map>
        </div>
      </div >

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}></Table>
          <h3 className="app__graphTitle">Global New {capitalizeFirstLetter(casesType)}</h3>
          <LineGraph className="app__graph" casesType={casesType}></LineGraph>
        </CardContent>
      </Card>
    </div >
  );
}

export default App;
