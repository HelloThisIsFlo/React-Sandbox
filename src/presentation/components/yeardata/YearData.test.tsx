import YearData from './YearData';
import * as React from 'react';
import { CONFIG } from '../../SimulationConfig';

test('hello', () => {

    const moneyMadeCallback = jest.fn();
    const yearDataJsx = (
        <YearData
            onNewMoneyMadeInAYear={moneyMadeCallback}
            hourlyRate={CONFIG.hourlyRate}
            hoursPerDay={CONFIG.hoursPerDay}
            daysPerMonth={CONFIG.daysPerMonth}
            monthsPerYear={CONFIG.monthsPerYear}
        />
    );

});

