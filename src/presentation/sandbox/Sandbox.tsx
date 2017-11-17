import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import PlotlyChart from 'react-plotlyjs-ts';

export default Sandbox;

const trace1 = {
    x: [1999, 2000, 2001, 2002],
    y: [10, 15, 13, 17],
    type: 'scatter'
};
const trace2 = {
    x: [1999, 2000, 2001, 2002],
    y: [16, 5, 11, 9],
    type: 'scatter'
};

const data = [trace1, trace2];

const layout = {
    title: 'Sales Growth',
    xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'Percent',
        showline: false
    }
};

const sandboxPage = (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-8 alert alert-success" id="mainTitle">
                <Hello name="Test" enthusiasmLevel={10} />
            </div>
        </div>
        <div className="row justify-content-center" id="plot">
            <PlotlyChart data={data} layout={layout}/>
        </div>
        <div className="row justify-content-center">
            <div className="col-10">
                <Slider onChange={handleSlider}/>
            </div>
        </div>
        <div className="row justify-content-center">
            <RaisedButton label="Default" />
        </div>
    </div>
);

function handleSlider(event: {}, value: number) {
    console.log(value);
}

function Sandbox() {
    return sandboxPage;
}