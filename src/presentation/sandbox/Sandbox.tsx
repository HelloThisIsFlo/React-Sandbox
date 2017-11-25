import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
import RaisedButton from 'material-ui/RaisedButton';
import PlotlyChart from 'react-plotlyjs-ts';
import * as update from 'immutability-helper';
import ValueSlider from '../valueslider/ValueSlider';
import NumberInput from '../valueslider/NumberInput';
import Paper from 'material-ui/Paper';

type MinMaxDefault = {
    min: number;
    max: number;
    default: number;
};
type Config = {
    hourlyRate: MinMaxDefault;
    hoursPerDay: MinMaxDefault;
    daysPerMonth: MinMaxDefault;
    monthsPerYear: MinMaxDefault;
};
const CONFIG: Config = {
    hourlyRate: {
        min: 20,
        max: 80,
        default: 30
    },
    hoursPerDay: {
        min: 2,
        max: 10,
        default: 6
    },
    daysPerMonth: {
        min: 5,
        max: 25,
        default: 10
    },
    monthsPerYear: {
        min: 2,
        max: 12,
        default: 6
    }
};
export interface SandboxProps { }
export interface SandboxState extends SandboxProps {
    hourlyRate: number;
    hoursPerDay: number;
    daysPerMonth: number;
    monthsPerYear: number;
}
export default class Sandbox extends React.Component<SandboxProps, SandboxState> {

    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            hourlyRate: CONFIG.hourlyRate.default,
            hoursPerDay: CONFIG.hoursPerDay.default,
            daysPerMonth: CONFIG.daysPerMonth.default,
            monthsPerYear: CONFIG.monthsPerYear.default
        };

        this.handleNewHourlyRate = this.handleNewHourlyRate.bind(this);
        this.handleNewHoursPerDay = this.handleNewHoursPerDay.bind(this);
        this.handleNewDaysPerMonth = this.handleNewDaysPerMonth.bind(this);
        this.handleNewMonthsPerYear = this.handleNewMonthsPerYear.bind(this);
        this.setNewState = this.setNewState.bind(this);
    }

    handleNewHourlyRate(newHourlyRate: number) {
        this.setNewState({ hourlyRate: newHourlyRate });
    }
    handleNewHoursPerDay(newHoursPerDay: number) {
        this.setNewState({ hoursPerDay: newHoursPerDay });
    }
    handleNewDaysPerMonth(newDaysPerMonth: number) {
        this.setNewState({ daysPerMonth: newDaysPerMonth });
    }
    handleNewMonthsPerYear(newMonthsPerYear: number) {
        this.setNewState({ monthsPerYear: newMonthsPerYear });
    }

    setNewState(newValues: {
        hourlyRate?: number,
        hoursPerDay?: number,
        daysPerMonth?: number,
        monthsPerYear?: number
    }) {
        this.setState(update(this.state, {
            $merge: newValues
        }));
    }

    render() {

        // TODO: Put this in a React Component that exposes the Money made in a year !! :D :D 
        const yearControl = (
            <Paper style={{ width: 150, margin: 5, display: 'flex', justifyContent: 'space-around' }}>
                <ValueSlider
                    mainCaption="h. rate"
                    valueCaption="&euro; / hour"
                    min={CONFIG.hourlyRate.min}
                    max={CONFIG.hourlyRate.max}
                    onNewValue={this.handleNewHourlyRate}
                    value={this.state.hourlyRate}
                />
                <ValueSlider
                    mainCaption="h. day"
                    valueCaption="h / day"
                    min={CONFIG.hoursPerDay.min}
                    max={CONFIG.hoursPerDay.max}
                    onNewValue={this.handleNewHoursPerDay}
                    value={this.state.hoursPerDay}
                />
                <ValueSlider
                    mainCaption="d. month"
                    valueCaption="d / month"
                    min={CONFIG.daysPerMonth.min}
                    max={CONFIG.daysPerMonth.max}
                    onNewValue={this.handleNewDaysPerMonth}
                    value={this.state.daysPerMonth}
                />
                <ValueSlider
                    mainCaption="months"
                    valueCaption="m worked"
                    min={CONFIG.monthsPerYear.min}
                    max={CONFIG.monthsPerYear.max}
                    onNewValue={this.handleNewMonthsPerYear}
                    value={this.state.monthsPerYear}
                />
            </Paper>
        );

        return (
            <div style={{ margin: 50 }}>
                <Paper>
                    <p> hourlyRate: {this.state.hourlyRate} </p>
                    <p> hoursPerDay: {this.state.hoursPerDay} </p>
                    <p> daysPerMonth: {this.state.daysPerMonth} </p>
                    <p> monthsPerYear: {this.state.monthsPerYear} </p>
                </Paper>
                <div style={{ width: 'auto', display: 'flex', justifyContent: 'space-around' }}>
                    {yearControl}
                    {yearControl}
                    {yearControl}
                    {yearControl}
                {/* </div>
                <div style={{ width: 'auto', display: 'flex', justifyContent: 'space-around', marginTop: 50 }}> */}
                    {yearControl}
                    {yearControl}
                    {yearControl}
                    {yearControl}
                </div>
                <div style={{ marginTop: 50 }} >
                    <NumberInput
                        onNewValue={(newVal) => {
                            this.setNewState({ hourlyRate: newVal });
                        }}
                    />
                </div>
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
