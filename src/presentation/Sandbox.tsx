import * as React from 'react';
import './Sandbox.css';
import RaisedButton from 'material-ui/RaisedButton';
import PlotlyChart from 'react-plotlyjs-ts';
import * as update from 'immutability-helper';
import ValueSlider from './components/valueslider/ValueSlider';
import NumberInput from './components/numberinput/NumberInput';
import Paper from 'material-ui/Paper';
import YearData from './components/yeardata/YearData';
import { CONFIG } from './SimulationConfig';

export interface SandboxProps { }
export interface SandboxState extends SandboxProps {
    year1: number;
}
export default class Sandbox extends React.Component<SandboxProps, SandboxState> {

    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            year1: 0,
        };

        this.handleNewMoneyMadeYear1 = this.handleNewMoneyMadeYear1.bind(this);
        this.setNewState = this.setNewState.bind(this);
    }

    render() {

        const verticalSeparator = (<div style={{ borderLeft: '1px solid #D5D5D5', height: 'auto', margin: 10, }} />);

        return (
            <div style={{ margin: 50 }}>
                <Paper style={{ padding: 20 }}>
                    <p> Gross Money Made in the Year: {this.state.year1} </p>
                    <p> {String.fromCharCode(8364)} </p>
                </Paper>
                <Paper style={{ width: 'auto', display: 'flex', justifyContent: 'space-around' }}>
                    <YearData 
                        onNewMoneyMadeInAYear={this.handleNewMoneyMadeYear1}
                        hourlyRate={CONFIG.hourlyRate}
                        hoursPerDay={CONFIG.hoursPerDay}
                        daysPerMonth={CONFIG.daysPerMonth}
                        monthsPerYear={CONFIG.monthsPerYear}
                    />
                </Paper>
            </div>
        );
    }

    private handleNewMoneyMadeYear1(newMoneyMadeYear1: number) {
        this.setNewState({ year1: newMoneyMadeYear1 });
    }

    private setNewState(newValues: { year1?: number }) {
        this.setState(update(this.state, { $merge: newValues }));
    }
}

function forMemoOnly() {

    const plotData = generatePlodData();

    const a = (
        <div id="plot">
            <PlotlyChart data={plotData.data} layout={plotData.layout} />
        </div>
    );

    function generatePlodData() {
        const fakeVal1 = 12;
        const fakeVal2 = 45;
        const fakeVal3 = 98;

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
        const newData = [trace1, trace2];

        const newLayout = {
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

        return {
            data: newData, 
            layout: newLayout
        };
    }
}
