import youAre from './assets/you-are.jpg';


function PanVerdict({verdict}){
    return(
        <div className="PanTimeVerdict">
            <div className="PanTimeVerdictImage"><img src={youAre}/></div>
            <div className="PanTimeVerdictMessage">
                You are <br/>{verdict}
            </div>
        </div>
    );
}



export default PanVerdict;