import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
import RaisedButton from 'material-ui/RaisedButton';
import Multislider, { MultisliderValues } from '../multislider/Multislider';
import PlotlyChart from 'react-plotlyjs-ts';
import * as update from 'immutability-helper';
import ValueSlider from '../valueslider/ValueSlider';

type MinMaxDefault = {
    min: number;
    max: number;
    default: number;
};
type Config = {
    hRate: MinMaxDefault;
};
const CONFIG: Config = {
    hRate: {
        min: 20,
        max: 80,
        default: 20
    }
};
export interface SandboxProps { }
export interface SandboxState extends SandboxProps { hRate: number; }
export default class Sandbox extends React.Component<SandboxProps, SandboxState> {

    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            hRate: CONFIG.hRate.default
        };

    }

    render() {
        return (
            <div style={{margin: 50}}>
                <ValueSlider
                    mainCaption="h. rate"
                    valueCaption="e / hour"
                    start={CONFIG.hRate.min}
                    end={CONFIG.hRate.max}
                />
                <p>
                    Hello
                </p>
            </div>
        );
    }
}

/*

<div id="plot">
    <PlotlyChart data={this.data} layout={this.layout} />
</div>

handleFirstMultislider(val: MultisliderValues) {
    const newState = update(this.state, {
        firstMultislider: {
            value1: { $set: val.value1 },
            value2: { $set: val.value2 },
            value3: { $set: val.value3 },
        }
    });
    this.setState(newState);
}

refreshPlotData() {
    const fakeVal1 = this.state.firstMultislider.value1 * 20;
    const fakeVal2 = this.state.firstMultislider.value2 * 20;
    const fakeVal3 = this.state.firstMultislider.value3 * 20;

    const trace1 = {
        x: [1999, 2000, 2001, 2002],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };
    const trace2 = {
        x: [1999, 2000, 2001, 2002],
        y: [16, fakeVal1, fakeVal2, fakeVal3],
        type: 'scatter'
    };
    this.data = [trace1, trace2];

    this.layout = {
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
}*/
