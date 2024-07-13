// @ts-check

import React, { useState } from 'react';
// import HowToUse from './HowToUse.jsx';
import Html5QrcodePlugin from './H.js';
import ResultContainerPlugin from './R.js';
import { useNavigate } from "react-router-dom";

const App = (props) => {
    const navigate = useNavigate();
    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
        // alert(decodedResult.results);
        const temp=decodedResult.decodedText;
        // alert(decodedResult);
        console.log(decodedResult.decodedText);
        navigate("/content",{state:{id:`${temp}`,name:'sabaoon'}});
    };

    return (
        <div className="App">
            <section className="App-section">
                <div className="App-section-title"> Tree QR Scanner</div>
                <br />
                <br />
                <br />
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
                <ResultContainerPlugin results={decodedResults} />
                {/* <HowToUse /> */}
            </section>
        </div>
    );
};

export default App;
