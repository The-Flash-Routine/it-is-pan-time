import { useEffect, useState } from 'react';
import youAre from './assets/you-are.jpg';
import Status from './Status';

let day = "PanDay"
let eve = "PanEve"
let night = "PanNight"
let narsingh = "PanNarsingh"

function PanTime(){
    const [valDay, setValDay] = useState(0);
    const [valEve, setValEve] = useState(0);
    const [valNight, setValNight] = useState(0);
    const [valVerdict, setValVerdict] = useState(day);

    /* 
        Duration:
            Day: 4AM - 6PM (Peaks at 12PM)
            Eve: 12PM-10PM (Peaks at 6PM)
            Night: 5PM-6AM (Peaks at 12AM)
    */

    useEffect(()=>{
        const intervalId = setInterval(() => {

            let currentTime = new Date();
            let totalMinutes = 60*currentTime.getHours() + currentTime.getMinutes()
        
            /*
                Nice Learning:
                 Basically if I don't use a callback type of function in these setState methods
                 and instead use like setValDay(getDayPercentage(totalMinutes))
                 then the every 1 second execution will stop. the useEffect just executes 1 time in beginning
                 Why ?
                 Initially I had thought that the setInterval is not triggering for some reason. (Spent lot if time as well)
                 Then wehn I commented all setState menthods... it was working fine
                 So basically then I figured out is that when I use the normal from of setState
                 Reason is that inituially all values are 0
                 When it first executes it sets value to let's say 5
                 Then in 2nd rerender it again picks the value 0 as initial value and not 5 (which is the current state)
                 So it again converts 0 to 5
                 Then sees that the current is already 5, so no change = so no rerender = so no useEffect trigger
                 But when I use lambda/callback type of setter
                 It always picks latest/cuurent value of state
                 So 0 becomes 5
                 5 becomes 10
                 and so on...
                 As state is changeing so everytime useeffect triggers then
            */
            setValDay(() => getDayPercentage(totalMinutes));
            setValEve(() => getEvePercentage(totalMinutes));
            setValNight(() => getNightPercentage(totalMinutes));
            setValVerdict(() => getPrimaryPan(valDay,valEve,valNight));
        }, 1000);

        return () => clearInterval(intervalId); 
    },
    [])
    
    


    return(
        <div className="PanTime">
            <div className="PanTimeTitle">
                It's Pan Time
            </div>
            <div className="PanTimeData">
                <Status text={day} value={valDay}/>
                <Status text={eve} value={valEve}/>
                <Status text={night} value={valNight}/>
            </div>
            <div className="PanTimeVerdict">
                <div className="PanTimeVerdictImage"><img src={youAre}/></div>
                <div className="PanTimeVerdictMessage">
                    You are <br/>{valVerdict}
                </div>
            </div>
            
        </div>
    );
}

const getPrimaryPan = (valDay, valEve, valNight) => {

    if( (valDay===valEve && valDay !==0) || (valEve===valNight && valEve!==0) || (valDay===valNight && valNight!==0)){
        return narsingh
    }else if( valDay > valEve && valDay > valNight){
        return day;
    }else if( valEve > valDay && valEve > valNight){
        return eve;
    }else{
        return night;
    }
}

const getDayPercentage = (t) =>{

    // Day: 4AM - 6PM (Peaks at 12PM)
    let _4AM = 4*60; //240  // Value = 0
    let _12PM = 12*60; //720 // Value = 100
    let _6PM = (12+6)*60; //1080 // Value = 0

    if(t >= _4AM && t < _12PM){
        // y = 0.208x - 49.92
        return Math.round(0.208*t - 49.92);
    }else if( t >= _12PM && t <= _6PM ){
        //  y = -0.278x + 300.24
        return Math.round(-0.278*t + 300.24);
    }else{
        return 0;
    }
}

const getEvePercentage = (t) =>{

    // Eve: 12PM-10PM (Peaks at 6PM)
    let _12PM = 12*60; //720 // Value = 0
    let _6PM = (12+6)*60; //1080 // Value = 100
    let _10PM = (12+10)*60 //1320 // Value = 0

    if( t >= _12PM && t < _6PM){
        // y = 0.278x - 200.24
        return Math.round(0.278*t - 200.24);
    }else if( t >= _6PM && t <= _10PM){
        // y = -0.417x + 550.36
        return Math.round(-0.417*t + 550.36);
    }else{
        return 0;
    }
    
}

const getNightPercentage = (t) =>{

    // Night: 5PM-6AM (Peaks at 12AM)
    let _5PM = (12+5)*60; //1020 // Value = 0
    let _11_59PM = (12+12)*60 - 1; //1439 // Value = 100
    let _12AM = 0; //0 // Value = 100
    let _6AM = (6)*60 //360 // Value = 0

    if( t >= _5PM && t <= _11_59PM ){
        // y = 0.239x - 243.78
        return Math.round(0.239*t - 243.78);
    }else if(t >= _12AM && t <= _6AM){
        // y = -0.278x + 100.08
        return Math.round(-0.278*t + 100.08);
    }else{
        return 0;
    }
}

export default PanTime;