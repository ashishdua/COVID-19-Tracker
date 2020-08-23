import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import "./Map.css";
import { showDataOnMap } from './util';

function Map({ themeType, countries, casesType, center, zoom }) {
    
    return (
        <div className={`map ${themeType === 'dark' ? "map__dark" : ''}`}>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy;  <a href="http://osm.org/copyright">OpenStreetMap</a> contibutors'
                >

                </TileLayer>
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map;