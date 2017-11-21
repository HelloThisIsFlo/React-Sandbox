import TaxCalculator, { IncomeTax, RunningCosts, HealthInsuranceCost, TaxableAmount } from '../TaxCalculator';
import TaxCalculatorZzp from './TaxCalculator';
import { read } from 'fs';

type StaticCosts = {
    incomeTax: number;
    runningCosts: number;
    healthInsuranceCost: number;
};
describe('TaxCalculator for Zzp', () => {

    describe('No deductions', () => {

        test('Money left is: Money made minus the sum of all expenses', () => {
            const incomeTax: IncomeTax =
                (grossYearly: number) => 0;
            const runningCosts: RunningCosts =
                (grossYearly: number) => 0;
            const healthInsuranceCost: HealthInsuranceCost =
                (grossYearly: number) => 0;
            const taxableAmount: TaxableAmount =
                (grossYearly: number, deductions: number) => 0;

            const taxCalculator: TaxCalculator = new TaxCalculatorZzp(
                incomeTax,
                runningCosts,
                healthInsuranceCost,
                taxableAmount);

            // expect(4).toBeAlmostEqual(0);
        });

        // function givenStaticCosts(costs: StaticCosts) {
        //     return {
        //         whenMakingInAYear: function(moneyMadeInAYear: number) {
        //             return {
        //                 moneyLeftIs: function(expectedLeft: number) {
        //                     expect
        //                 }
        //             }
        //         }
        //     }
        // }
    });

    // TODO: Implement tests with some deductions !!

});