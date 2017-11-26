import * as React from 'react';
import * as update from 'immutability-helper';
import ValueSlider from '../valueslider/ValueSlider';
import { style, captions } from './YearDataStyle';
import { ValueConfig } from '../../SimulationConfig';

export type YearDataProps = {
    onNewMoneyMadeInAYear: (moneyMade: number) => void;
    hourlyRateConfig: ValueConfig;
    hoursPerDayConfig: ValueConfig;
    daysPerMonthConfig: ValueConfig;
    monthsPerYearConfig: ValueConfig;
};
export interface YearDataState extends YearDataProps {
    hourlyRate: number;
    hoursPerDay: number;
    daysPerMonth: number;
    monthsPerYear: number;
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
            hourlyRate: props.hourlyRateConfig.default,
            hoursPerDay: props.hoursPerDayConfig.default,
            daysPerMonth: props.daysPerMonthConfig.default,
            monthsPerYear: props.monthsPerYearConfig.default
        };

        this.state = update(props, { $merge: initValues });

        this.handleNewHourlyRate = this.handleNewHourlyRate.bind(this);
        this.handleNewHoursPerDay = this.handleNewHoursPerDay.bind(this);
        this.handleNewDaysPerMonth = this.handleNewDaysPerMonth.bind(this);
        this.handleNewMonthsPerYear = this.handleNewMonthsPerYear.bind(this);
    }

    render() {
        // Paper
        return (
            <div style={style.root}>
                <div>
                    <p>10800</p>
                </div>
                <ValueSlider
                    mainCaption={captions.hourlyRate.mainCaption}
                    valueCaption={captions.hourlyRate.valueCaption}
                    min={this.state.hourlyRateConfig.min}
                    max={this.state.hourlyRateConfig.max}
                    onNewValue={this.handleNewHourlyRate}
                    value={this.state.hourlyRate}
                />
                <ValueSlider
                    mainCaption={captions.hoursPerDay.mainCaption}
                    valueCaption={captions.hoursPerDay.valueCaption}
                    min={this.state.hoursPerDayConfig.min}
                    max={this.state.hoursPerDayConfig.max}
                    onNewValue={this.handleNewHoursPerDay}
                    value={this.state.hoursPerDay}
                />
                <ValueSlider
                    mainCaption={captions.daysPerMonth.mainCaption}
                    valueCaption={captions.daysPerMonth.valueCaption}
                    min={this.state.daysPerMonthConfig.min}
                    max={this.state.daysPerMonthConfig.max}
                    onNewValue={this.handleNewDaysPerMonth}
                    value={this.state.daysPerMonth}
                />
                <ValueSlider
                    mainCaption={captions.monthsPerYear.mainCaption}
                    valueCaption={captions.monthsPerYear.valueCaption}
                    min={this.state.monthsPerYearConfig.min}
                    max={this.state.monthsPerYearConfig.max}
                    onNewValue={this.handleNewMonthsPerYear}
                    value={this.state.monthsPerYear}
                />
            </div>

        );
    }

    private handleNewHourlyRate(newHourlyRate: number) {
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, { $merge: { currentHourlyRate: newHourlyRate } }));
    }

    private handleNewHoursPerDay(newHoursPerDay: number) {
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, { $merge: { currentHoursPerDay: newHoursPerDay } }));
    }

    private handleNewDaysPerMonth(newDaysPerMonth: number) {
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, { $merge: { currentDaysPerMonth: newDaysPerMonth } }));
    }

    private handleNewMonthsPerYear(newMonthsPerYear: number) {
        console.log('Warning: For now doing nothing here, only setting state');
        this.setState(update(this.state, { $merge: { currentMonthsPerYear: newMonthsPerYear } }));
    }

    private calculateNewGrossAmountMade(newValues: GrossAmountMadeParams) {
        // TODO add test
    }

}