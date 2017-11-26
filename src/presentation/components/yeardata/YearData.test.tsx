import YearData from './YearData';
import * as React from 'react';
import { Config } from '../../SimulationConfig';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MuiThemeProvider } from 'material-ui/styles';

const MOCK_CONFIG: Config = {
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

it('should render correctly', () => {
    const moneyMadeCallback = jest.fn();
    const yearDataJsx = (
        <MuiThemeProvider>
            <YearData
                onNewMoneyMadeInAYear={moneyMadeCallback}
                hourlyRate={MOCK_CONFIG.hourlyRate}
                hoursPerDay={MOCK_CONFIG.hoursPerDay}
                daysPerMonth={MOCK_CONFIG.daysPerMonth}
                monthsPerYear={MOCK_CONFIG.monthsPerYear}
            />
        </MuiThemeProvider>
    );
    const wrapper = mount(yearDataJsx);

    expect(toJson(wrapper)).toMatchSnapshot();
});
