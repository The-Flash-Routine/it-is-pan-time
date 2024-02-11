import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function LinearProgressWithLabel(props) {
    return (
        <div className='Indicator'>
            <div className='IndicatorProgress'><LinearProgress sx={{height: '20px'}} variant="determinate" {...props} /></div>
            <div className='IndicatorValue'><Typography variant="body2" color="text.secondary">{props.value}%</Typography></div>
        </div>
    );
}

function Status({text,value}){
    
    return(
        <div className='PanTimeStatus'>
            <div style={{fontWeight: 1000}} className='PanTimeStatusTitle'>{text}</div>
            <div className='PanTimeStatusValue'><LinearProgressWithLabel value={value} /></div>
        </div>
    );
}

export default Status