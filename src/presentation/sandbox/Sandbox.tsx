import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
import RaisedButton from 'material-ui/RaisedButton';
import Multislider, { MultisliderValues } from '../multislider/Multislider';
import PlotlyChart from 'react-plotlyjs-ts';
import * as update from 'immutability-helper';
import ValueSlider from '../valueslider/ValueSlider';

export interface SandboxProps {
}
export interface SandboxState {
    firstMultislider: MultisliderValues;
}
class Sandbox extends React.Component<SandboxProps, SandboxState> {

    data: Array<{}>;
    layout: {};

    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            firstMultislider: {
                value1: 0,
                value2: 0,
                value3: 0
            }
        };

        this.handleFirstMultislider = this.handleFirstMultislider.bind(this);
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
    }

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

    render() {
        this.refreshPlotData();
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 alert alert-success" id="mainTitle">
                        <Hello name="Test" enthusiasmLevel={10} />
                    </div>
                </div>
                <div className="row justify-content-center" id="plot">
                    <PlotlyChart data={this.data} layout={this.layout} />
                </div>
                <div className="row justify-content-center">
                    <ValueSlider
                        mainCaption="h. rate"
                        valueCaption="e / hour"
                        start={1}
                        end={3}
                    />
                </div>
            </div>
        );
    }
}

export default Sandbox;