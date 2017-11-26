import YearData from './YearData';
import * as React from 'react';
import { Config } from '../../SimulationConfig';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MuiThemeProvider } from 'material-ui/styles';
import { ValueSliderProps } from '../valueslider/ValueSlider';

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

type SliderName = 'hourlyRate' | 'hoursPerDay' | 'daysPerMonth' | 'monthsPerYear';
function getValueSlider(yearData: ShallowWrapper, name: SliderName): ShallowWrapper {
    const position = {
        hourlyRate: 0,
        hoursPerDay: 1,
        daysPerMonth: 2,
        monthsPerYear: 3
    };
    return yearData.childAt(position[name]);
}

describe('YearData', () => {
    const moneyMadeCallback = jest.fn();
    const yearDataJsx = (
        <YearData
            onNewMoneyMadeInAYear={moneyMadeCallback}
            hourlyRate={MOCK_CONFIG.hourlyRate}
            hoursPerDay={MOCK_CONFIG.hoursPerDay}
            daysPerMonth={MOCK_CONFIG.daysPerMonth}
            monthsPerYear={MOCK_CONFIG.monthsPerYear}
        />
    );
    beforeEach(moneyMadeCallback.mockClear);

    describe('General layout', () => {
        it('should render correctly', () => {
            const wrapper = mount((
                <MuiThemeProvider>
                    {yearDataJsx}
                </MuiThemeProvider>
            ));
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('has the sliders in the correct order', () => {
            const wrapper = shallow(yearDataJsx);
            const hourlyRateSlider = getValueSlider(wrapper, 'hourlyRate');
            const hoursPerDaySlider = getValueSlider(wrapper, 'hoursPerDay');
            const daysPerMonthSlider = getValueSlider(wrapper, 'daysPerMonth');
            const monthsPerYearSlider = getValueSlider(wrapper, 'monthsPerYear');

            ensureCaptionOf(hourlyRateSlider).contains('h. rate');
            ensureCaptionOf(hoursPerDaySlider).contains('h. day');
            ensureCaptionOf(daysPerMonthSlider).contains('d. month');
            ensureCaptionOf(monthsPerYearSlider).contains('month');

            function ensureCaptionOf(valueSlider: ShallowWrapper) {
                const mainCaption =
                    (valueSlider.props() as ValueSliderProps).mainCaption;
                return {
                    contains: (expected: string) => {
                        expect(mainCaption).toContain(expected);
                    }
                };
            }
        });

    });

    describe('Calculate Gross Money Made in Year', () => {

        it.skip('test', () => {
            // const wrapper = shallow(yearDataJsx);

            // console.log(wrapper.childAt(0).debug());
            // // wrapper.props().onNewMoneyMadeInAYear(44);

            // // wrapper.state().onNewMoneyMadeInAYear(44);

            // let thing;
            // thing = wrapper.childAt(0).props().onNewValue(44);

            // console.log(thing);

            // console.log(moneyMadeCallback.mock);

        });
    });

});