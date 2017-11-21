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
            givenStaticCosts({
                incomeTax: 200,
                runningCosts: 500,
                healthInsuranceCost: 1000
            })
                .whenMakingInAYear(50000)
                .moneyLeftIs(50000 - 200 - 500 - 1000);
        });

        function givenStaticCosts(costs: StaticCosts) {
            /* No deductible amounts for now !! */
            const taxableAmountFn: TaxableAmount =
                (grossYearly: number, deductions: number) => 0;

            const incomeTaxFn: IncomeTax =
                (grossYearly: number) => costs.incomeTax;
            const runningCostsFn: RunningCosts =
                (grossYearly: number) => costs.runningCosts;
            const healthInsuranceCostFn: HealthInsuranceCost =
                (grossYearly: number) => costs.healthInsuranceCost;

            const taxCalculator: TaxCalculator = new TaxCalculatorZzp(
                incomeTaxFn,
                runningCostsFn,
                healthInsuranceCostFn,
                taxableAmountFn
            );

            return {
                whenMakingInAYear: function (moneyMadeInAYear: number) {

                    const moneyLeft = taxCalculator.moneyLeftAfterAllExpenses(moneyMadeInAYear);

                    return {
                        moneyLeftIs: function (expectedLeft: number) {
                            expect(moneyLeft).toBeAlmostEqual(expectedLeft);
                        }
                    };
                }
            };
        }
    });

    // TODO: Implement tests with some deductions !! (Update `givenStaticCosts(...)` function)

});