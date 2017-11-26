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
    grossMade: number;
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

        let initValues = {
            hourlyRate: props.hourlyRateConfig.default,
            hoursPerDay: props.hoursPerDayConfig.default,
            daysPerMonth: props.daysPerMonthConfig.default,
            monthsPerYear: props.monthsPerYearConfig.default,
        };

        this.state = update(props, { $merge: initValues });
        this.state = update(this.state, {
            $merge: {grossMade: this.calculateGrossAmountMade({})}
        });

        this.handleNewValue = this.handleNewValue.bind(this);
    }

    render() {
        return (
            <div style={style.root}>
                <div>
                    <p>{this.state.grossMade}</p>
                </div>
                <ValueSlider
                    mainCaption={captions.hourlyRate.mainCaption}
                    valueCaption={captions.hourlyRate.valueCaption}
                    min={this.state.hourlyRateConfig.min}
                    max={this.state.hourlyRateConfig.max}
                    onNewValue={(val) => this.handleNewValue({hourlyRate: val})}
                    value={this.state.hourlyRate}
                />
                <ValueSlider
                    mainCaption={captions.hoursPerDay.mainCaption}
                    valueCaption={captions.hoursPerDay.valueCaption}
                    min={this.state.hoursPerDayConfig.min}
                    max={this.state.hoursPerDayConfig.max}
                    onNewValue={(val) => this.handleNewValue({hoursPerDay: val})}
                    value={this.state.hoursPerDay}
                />
                <ValueSlider
                    mainCaption={captions.daysPerMonth.mainCaption}
                    valueCaption={captions.daysPerMonth.valueCaption}
                    min={this.state.daysPerMonthConfig.min}
                    max={this.state.daysPerMonthConfig.max}
                    onNewValue={(val) => this.handleNewValue({daysPerMonth: val})}
                    value={this.state.daysPerMonth}
                />
                <ValueSlider
                    mainCaption={captions.monthsPerYear.mainCaption}
                    valueCaption={captions.monthsPerYear.valueCaption}
                    min={this.state.monthsPerYearConfig.min}
                    max={this.state.monthsPerYearConfig.max}
                    onNewValue={(val) => this.handleNewValue({monthsPerYear: val})}
                    value={this.state.monthsPerYear}
                />
            </div>

        );
    }

    private handleNewValue(newVal: GrossAmountMadeParams) {
        let newState = update(this.state, {$merge: newVal});
        newState.grossMade = this.calculateGrossAmountMade(newVal);

        // Call callback
        this.state.onNewMoneyMadeInAYear(newState.grossMade);

        this.setState(newState);
    }

    private calculateGrossAmountMade(overrides: GrossAmountMadeParams): number {
        const values = update(this.state || {}, {$merge: overrides});
        return values.hourlyRate * values.hoursPerDay * values.daysPerMonth * values.monthsPerYear;
    }

}