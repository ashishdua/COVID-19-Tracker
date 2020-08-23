import { Circle, Popup } from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: '#FB4443',
        multiplier: 800
    },
    recovered: {
        hex: '#7DD71D',
        multiplier: 1200
    },
    deaths: {
        hex: '#CC1034',
        multiplier: 2000
    },
}

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        }
        else {
            return 1;
        }
    });

    return sortedData;
}

export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType.hex]}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);

export const prettyPrintStat = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}` : '+0'
);

export const capitalizeFirstLetter = (text) => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

export const getColorBasedOnCaseType = (casesType) => {
    let classNameObj = { classNameForInfoBoxHeaderBorder: '', classNameForInfoBoxText: '' };

    switch (casesType) {
        case 'cases':
            classNameObj.classNameForInfoBoxHeaderBorder = 'infoBox__CasesBorderColor';
            classNameObj.classNameForInfoBoxText = 'infoBox__CasesTextColor';
            classNameObj.backgroundColorForLineGraph = 'rgba(251, 68, 67, 0.5)';
            classNameObj.borderColorForLineGraph = '#FB4443';
            break;
        case 'recovered':
            classNameObj.classNameForInfoBoxHeaderBorder = 'infoBox__RecoveredBorderColor';
            classNameObj.classNameForInfoBoxText = 'infoBox__RecoveredTextColor';
            classNameObj.backgroundColorForLineGraph = 'rgba(125, 215, 29, 0.5)';
            classNameObj.borderColorForLineGraph = '#7DD71D';
            break;

        case 'deaths':
            classNameObj.classNameForInfoBoxHeaderBorder = 'infoBox__DeathsBorderColor';
            classNameObj.classNameForInfoBoxText = 'infoBox__DeathsTextColor';
            classNameObj.backgroundColorForLineGraph = 'rgba(204, 16, 52, 0.5)';
            classNameObj.borderColorForLineGraph = '#CC1034';
            break;
        default:
            classNameObj.classNameForInfoBoxHeaderBorder = 'infoBox__CasesBorderColor';
            classNameObj.classNameForInfoBoxText = 'infoBox__CasesTextColor';
            classNameObj.backgroundColorForLineGraph = 'rgba(251, 68, 67, 0.5)';
            classNameObj.borderColorForLineGraph = '#FB4443';
            break;
    }

    return classNameObj;
};