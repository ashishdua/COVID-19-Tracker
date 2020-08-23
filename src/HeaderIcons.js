import React from 'react';
import { Brightness7, Brightness4, GitHub, Info } from '@material-ui/icons';
import { Tooltip, IconButton } from "@material-ui/core";

function HeaderIcons({ themeType, ...props }) {
    var commonClassName = themeType === 'light' ? 'app__commonHeaderIcon' : 'app__commonHeaderIcon__dark';
    return (
        <div className="app__headerIcons app__commonFloatClass">
            <Tooltip title="Data Source - https://disease.sh"><IconButton><Info className={commonClassName}></Info></IconButton></Tooltip>
            <Tooltip title="Repo Link"><IconButton><GitHub className={commonClassName} onClick={e => window.open("https://github.com/ashishdua")}></GitHub></IconButton></Tooltip>

            <Tooltip title="Toggle light/dark theme">
                <IconButton>
                    {themeType === 'dark' ? <Brightness7 className={commonClassName} onClick={() => props.onClick('dark')}></Brightness7> : <Brightness4 className={commonClassName} onClick={() => props.onClick('light')}></Brightness4>}

                </IconButton>
            </Tooltip>
        </div>
    );
}

export default HeaderIcons;