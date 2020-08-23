import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(country => (
                <tr>
                    <img alt='' src={'https://www.countryflags.io/' + country.countryInfo.iso2 + '/flat/32.png'}></img>
                    <td style={{ width: '30%', textAlign: 'left' }}>{country.country}</td>
                    <td style={{ width: '50%', textAlign: 'right' }}><strong>{numeral(country.cases).format('0,0')}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table;