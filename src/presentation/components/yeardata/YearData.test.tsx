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

type GrossAmountMadeParams = {
    hourlyRate?: number;
    hoursPerDay?: number;
    daysPerMonth?: number;
    monthsPerYear?: number;
};
function calculateDefaultGrossMoneyMade(override: GrossAmountMadeParams) {
    return (override.hourlyRate || MOCK_CONFIG.hourlyRate.default)
        * (override.hoursPerDay || MOCK_CONFIG.hoursPerDay.default)
        * (override.daysPerMonth || MOCK_CONFIG.daysPerMonth.default)
        * (override.monthsPerYear || MOCK_CONFIG.monthsPerYear.default);
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
            const defaultGross = calculateDefaultGrossMoneyMade({});

            expect(getGrossAmountElement(yearDataWrapper).text())
                .toContain(defaultGross);
        });

    });

    describe('Calculate Gross Money Made in Year', () => {

        describe('On new Hourly Rate', () => {
            let newHourlyRate;
            let expectedGross: number;

            beforeEach(() => {
                // Given: A new hourly rate
                newHourlyRate = 85;
                expectedGross = calculateDefaultGrossMoneyMade({ hourlyRate: newHourlyRate });

                // When: New rate is set on the Slider
                const hourlyRateSlider = getValueSlider(yearDataWrapper, 'hourlyRate');
                const newHRateCallback = (hourlyRateSlider.props() as ValueSliderProps).onNewValue;
                if (newHRateCallback) { newHRateCallback(newHourlyRate); }
                // Notify the ShallowWrapper that something changed
                yearDataWrapper.update();
            });

            it('should display the new value', () => {
                const hourlyRateSlider = getValueSlider(yearDataWrapper, 'hourlyRate');

                expectValueOf(hourlyRateSlider).toEqual(85);

                function expectValueOf(valueSlider: ShallowWrapper) {
                    return expect((valueSlider.props() as ValueSliderProps).value);
                }
            });

            it('should display the new Gross Money Made', () => {
                expect(getGrossAmountElement(yearDataWrapper).text())
                    .toContain(expectedGross);
            });

            it('should call the callback with the new Gross Money Made', () => {
                const calls = moneyMadeCallback.mock.calls;
                expect(calls.length).toBeGreaterThanOrEqual(1);

                const lastCall = calls[calls.length - 1];
                const lastCallValue = lastCall[0];
                expect(lastCallValue).toEqual(expectedGross);
            });
        });

        describe('On new Values', () => {
            let newHourlyRate;
            let newHoursPerDay;
            let newDaysPerMonth;
            let newMonthsPerYear;
            let expectedGross: number;

            beforeEach(() => {
                // Given: A new hourly rate
                newHourlyRate = 77;
                newHoursPerDay = 8;
                newDaysPerMonth = 11;
                newMonthsPerYear = 9;

                expectedGross = 77 * 8 * 11 * 9;

                // When: New values are set on the Slider
                function simulateNewValue(slider: SliderName, val: number) {
                    const sliderWrapper = getValueSlider(yearDataWrapper, slider);
                    const newValCallback =
                        (sliderWrapper.props() as ValueSliderProps).onNewValue;
                    if (newValCallback) { newValCallback(val); }
                }
                simulateNewValue('hourlyRate', 77);
                simulateNewValue('hoursPerDay', 8);
                simulateNewValue('daysPerMonth', 11);
                simulateNewValue('monthsPerYear', 9);

                // Notify the ShallowWrapper that something changed
                yearDataWrapper.update();
            });

            it('should display the new values', () => {
                const hourlyRateSlider = getValueSlider(yearDataWrapper, 'hourlyRate');
                const hoursPerDaySlider = getValueSlider(yearDataWrapper, 'hoursPerDay');
                const daysPerMonthSlider = getValueSlider(yearDataWrapper, 'daysPerMonth');
                const monthsPerYearSlider = getValueSlider(yearDataWrapper, 'monthsPerYear');

                expectValueOf(hourlyRateSlider).toEqual(77);
                expectValueOf(hoursPerDaySlider).toEqual(8);
                expectValueOf(daysPerMonthSlider).toEqual(11);
                expectValueOf(monthsPerYearSlider).toEqual(9);

                function expectValueOf(valueSlider: ShallowWrapper) {
                    return expect((valueSlider.props() as ValueSliderProps).value);
                }
            });

            it('should display the new Gross Money Made', () => {
                expect(getGrossAmountElement(yearDataWrapper).text())
                    .toContain(expectedGross);
            });

            it('should call the callback with the new Gross Money Made', () => {
                const calls = moneyMadeCallback.mock.calls;
                expect(calls.length).toBeGreaterThanOrEqual(1);

                const lastCall = calls[calls.length - 1];
                const lastCallValue = lastCall[0];
                expect(lastCallValue).toEqual(expectedGross);
            });
        });
    });

});