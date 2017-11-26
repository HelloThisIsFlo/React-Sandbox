import * as React from 'react';
import * as update from 'immutability-helper';
import ValueSlider from '../valueslider/ValueSlider';
import { style, captions } from './YearDataStyle';
import { ValueConfig } from '../../SimulationConfig';

export type YearDataProps = {
    onNewMoneyMadeInAYear: (moneyMade: number) => void;
    hourlyRate: ValueConfig;
    hoursPerDay: ValueConfig;
    daysPerMonth: ValueConfig;
    monthsPerYear: ValueConfig;
};
export interface YearDataState extends YearDataProps {
    currentHourlyRate: number;
    currentHoursPerDay: number;
    currentDaysPerMonth: number;
    currentMonthsPerYear: number;
}
type GrossAmountMadeParams = {
    hourlyRate?: number;
    hoursPerDay?: number;
    daysPerMonth?: number;
    monthsPerYear?: number;
};
export default class YearData extends React.Component<YearDataProps, YearDataState> {

    constructor(props: YearDataProps) {
        super(props);

        const initValues = {
            currentHourlyRate: props.hourlyRate.default,
            currentHoursPerDay: props.hoursPerDay.default,
            currentDaysPerMonth: props.daysPerMonth.default,
            currentMonthsPerYear: props.monthsPerYear.default
        };

        this.state = update(props, { $merge: initValues });

        this.handleNewHourlyRate = this.handleNewHourlyRate.bind(this);
        this.handleNewHoursPerDay = this.handleNewHoursPerDay.bind(this);
        this.handleNewDaysPerMonth = this.handleNewDaysPerMonth.bind(this);
        this.handleNewMonthsPerYear = this.handleNewMonthsPerYear.bind(this);
    }

    render() {
        return (
            <div style={style.root}>
                <ValueSlider
                    mainCaption={captions.hourlyRate.mainCaption}
                    valueCaption={captions.hourlyRate.valueCaption}
                    min={this.state.hourlyRate.min}
                    max={this.state.hourlyRate.max}
                    onNewValue={this.handleNewHourlyRate}
                    value={this.state.currentHourlyRate}
                />
                <ValueSlider
                    mainCaption={captions.hoursPerDay.mainCaption}
                    valueCaption={captions.hoursPerDay.valueCaption}
                    min={this.state.hoursPerDay.min}
                    max={this.state.hoursPerDay.max}
                    onNewValue={this.handleNewHoursPerDay}
                    value={this.state.currentHoursPerDay}
                />
                <ValueSlider
                    mainCaption={captions.daysPerMonth.mainCaption}
                    valueCaption={captions.daysPerMonth.valueCaption}
                    min={this.state.daysPerMonth.min}
                    max={this.state.daysPerMonth.max}
                    onNewValue={this.handleNewDaysPerMonth}
                    value={this.state.currentDaysPerMonth}
                />
                <ValueSlider
                    mainCaption={captions.monthsPerYear.mainCaption}
                    valueCaption={captions.monthsPerYear.valueCaption}
                    min={this.state.monthsPerYear.min}
                    max={this.state.monthsPerYear.max}
                    onNewValue={this.handleNewMonthsPerYear}
                    value={this.state.currentMonthsPerYear}
                />
            </div>

        );
    }

    private handleNewHourlyRate(newHourlyRate: number) { 
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, {$merge: {currentHourlyRate: newHourlyRate}}));
    }

    private handleNewHoursPerDay(newHoursPerDay: number) {
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, {$merge: {currentHoursPerDay: newHoursPerDay}}));
     }

    private handleNewDaysPerMonth(newDaysPerMonth: number) { 
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, {$merge: {currentDaysPerMonth: newDaysPerMonth}}));
    }

    private handleNewMonthsPerYear(newMonthsPerYear: number) { 
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, {$merge: {currentMonthsPerYear: newMonthsPerYear}}));
    }

    private calculateNewGrossAmountMade(newValues: GrossAmountMadeParams) {
        // TODO add test
    }

}