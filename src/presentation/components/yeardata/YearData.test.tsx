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

function getGrossAmountElement(yearData: ShallowWrapper) {
    return yearData.childAt(0);
}
type SliderName = 'hourlyRate' | 'hoursPerDay' | 'daysPerMonth' | 'monthsPerYear';
function getValueSlider(yearData: ShallowWrapper, name: SliderName): ShallowWrapper {
    const position = {
        hourlyRate: 1,
        hoursPerDay: 2,
        daysPerMonth: 3,
        monthsPerYear: 4
    };
    return yearData.childAt(position[name]);
}
function calculateGrossMoneyMade(hourly: number, hPDay: number, dPerMonth: number, mPYear: number) {
    return hourly * hPDay * dPerMonth * mPYear;
}

describe('YearData', () => {
    const moneyMadeCallback = jest.fn();
    beforeEach(moneyMadeCallback.mockClear);

    const yearDataJsx = (
        <YearData
            onNewMoneyMadeInAYear={moneyMadeCallback}
            hourlyRateConfig={MOCK_CONFIG.hourlyRate}
            hoursPerDayConfig={MOCK_CONFIG.hoursPerDay}
            daysPerMonthConfig={MOCK_CONFIG.daysPerMonth}
            monthsPerYearConfig={MOCK_CONFIG.monthsPerYear}
        />
    );
    let yearDataWrapper: ShallowWrapper = shallow(yearDataJsx);

    describe('General layout', () => {
        it.skip('should render correctly', () => {
            // Mui wrapper needed if rendering the entire component 
            // (since some sub components are from 'Material UI' library)
            const wrapperWithMaterialUIWrapper = mount((
                <MuiThemeProvider>
                    {yearDataJsx}
                </MuiThemeProvider>
            ));
            expect(toJson(wrapperWithMaterialUIWrapper)).toMatchSnapshot();
        });

        it('has the sliders in the correct order', () => {
            const hourlyRateSlider = getValueSlider(yearDataWrapper, 'hourlyRate');
            const hoursPerDaySlider = getValueSlider(yearDataWrapper, 'hoursPerDay');
            const daysPerMonthSlider = getValueSlider(yearDataWrapper, 'daysPerMonth');
            const monthsPerYearSlider = getValueSlider(yearDataWrapper, 'monthsPerYear');

            expectCaptionOf(hourlyRateSlider).toContain('h. rate');
            expectCaptionOf(hoursPerDaySlider).toContain('h. day');
            expectCaptionOf(daysPerMonthSlider).toContain('d. month');
            expectCaptionOf(monthsPerYearSlider).toContain('month');

            function expectCaptionOf(valueSlider: ShallowWrapper) {
                return expect((valueSlider.props() as ValueSliderProps).mainCaption);
            }
        });

        it('displays the defaults values', () => {
            const hourlyRateSlider = getValueSlider(yearDataWrapper, 'hourlyRate');
            const hoursPerDaySlider = getValueSlider(yearDataWrapper, 'hoursPerDay');
            const daysPerMonthSlider = getValueSlider(yearDataWrapper, 'daysPerMonth');
            const monthsPerYearSlider = getValueSlider(yearDataWrapper, 'monthsPerYear');

            expectValueOf(hourlyRateSlider).toEqual(MOCK_CONFIG.hourlyRate.default);
            expectValueOf(hoursPerDaySlider).toEqual(MOCK_CONFIG.hoursPerDay.default);
            expectValueOf(daysPerMonthSlider).toEqual(MOCK_CONFIG.daysPerMonth.default);
            expectValueOf(monthsPerYearSlider).toEqual(MOCK_CONFIG.monthsPerYear.default);

            function expectValueOf(valueSlider: ShallowWrapper) {
                return expect((valueSlider.props() as ValueSliderProps).value);
            }
        });

        it('displays the default Gross Money Made', () => {
            const defaultGross = calculateGrossMoneyMade(
                MOCK_CONFIG.hourlyRate.default,
                MOCK_CONFIG.hoursPerDay.default,
                MOCK_CONFIG.daysPerMonth.default,
                MOCK_CONFIG.monthsPerYear.default
            );

            expect(getGrossAmountElement(yearDataWrapper).text())
                .toContain(defaultGross);
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