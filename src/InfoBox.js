import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css'
import { getColorBasedOnCaseType } from './util';

function InfoBox({ themeType, casesType, active, title, cases, total, ...props }) {

    var classNameObj = getColorBasedOnCaseType(casesType);

    return (
        <Card onClick={props.onClick} className={`infoBox ${themeType === 'dark' ? "infoBox__dark" : ''} ${active ? 'infoBox--selected' : 'infoBox--notSelected'} ${classNameObj.classNameForInfoBoxHeaderBorder}`} >
            <CardContent>
                <Typography className={`infoBox__title ${themeType === 'dark' ? "infoBox__title__dark" : ''}`} color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${classNameObj.classNameForInfoBoxText}`}>{cases}</h2>

                <Typography className={`infoBox__total ${themeType === 'dark' ? "infoBox__total__dark" : ''}`} color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </ Card>
    )
}

export default InfoBox;