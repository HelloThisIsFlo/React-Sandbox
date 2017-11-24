import incomeTaxFactoryZzp from './tax_calculator/zzp/IncomeTaxFactory';
import incomeTaxFactoryDiv30Ruling from './tax_calculator/div30Ruling/IncomeTaxFactory';
import { SplineInterpolator } from '../../interpolation/InterpolatorImpl';
import TaxCalculatorZzp, {
    runningCostsZzp,
    healthInsuranceCostZzp,
    taxableAmountZzp
} from './tax_calculator/zzp/TaxCalculator';
import TaxCalculatorDiv30Ruling, {
    runningCostsDiv30Ruling,
    healthInsuranceCostDiv30Ruling,
    taxableAmountDiv30Ruling
} from './tax_calculator/div30Ruling/TaxCalculator';
import { SimulationImpl, SimulationInput } from './simulation/Simulation';
import * as update from 'immutability-helper';

const zzpGtN = incomeTaxFactoryZzp(new SplineInterpolator());
const div30GtN = incomeTaxFactoryDiv30Ruling();

const zzpCalculator = new TaxCalculatorZzp(
    incomeTaxFactoryZzp(new SplineInterpolator()),
    runningCostsZzp,
    healthInsuranceCostZzp,
    taxableAmountZzp
);
const div30RulingCalculator = new TaxCalculatorDiv30Ruling(
    incomeTaxFactoryDiv30Ruling(),
    runningCostsDiv30Ruling,
    healthInsuranceCostDiv30Ruling,
    taxableAmountDiv30Ruling
);
test.skip('Sandbox', () => {
    const simulation = new SimulationImpl(zzpCalculator, div30RulingCalculator);

    const input: SimulationInput[] = [
        50000,
        50000,
        50000,
        50000,
        50000,
        50000,
        50000,
        50000
    ].map((made, index) => ({ currentYear: index + 1, moneyMadeDuringTheYear: made }));

    console.log(simulation.over8Years(input));
});
test.skip('Sandbox', () => {

    const moneyMadeValues = [];
    for (var i = 10000; i <= 70000; i += 2000) {
        moneyMadeValues.push(i);
    }

    moneyMadeValues.forEach(moneyMade => {
        const leftIfZzp = zzpCalculator.moneyLeftAfterAllExpenses(moneyMade);
        const leftIfdiv30 = div30RulingCalculator.moneyLeftAfterAllExpenses(moneyMade);

        const template = `
                -------------------------------------
                Money Made: ${moneyMade}

                Money left if using   ZZP: ${leftIfZzp}
                Money left if using DIV30: ${leftIfdiv30}

                Net Profit if using DIV30 instead of ZZP
                ==> ${leftIfdiv30 - leftIfZzp}
                -------------------------------------
                `;
        console.log(template);
    });

});

test('sandbox', () => {

    type Person = {
        name: string;
        lastname: string;
        age: number
    };
    type ExtraPerson = {
        name?: string;
        lastname?: string;
        age?: number;
    };
    const base: Person = {
        name: 'patrick',
        lastname: 'Franklin',
        age: 9
    };

    const extra: ExtraPerson = {
        lastname: 'Benedict'
    };

    const res = update(base, {$merge: extra});

    console.log(res);
});