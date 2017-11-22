import TaxCalculator, { IncomeTax, RunningCosts, HealthInsuranceCost, TaxableAmount } from '../TaxCalculator';
import { read } from 'fs';
import TaxCalculatorDiv30Ruling, { runningCostsDiv30Ruling } from './TaxCalculator';
import incomeTaxFactoryDiv30Ruling from './IncomeTaxFactory';

type StaticCosts = {
    runningCosts: number;
    healthInsuranceCost: number;
};
/*
3 scenarios:
- Above minimum | no deductions
- Above minimum | deductions
- Below minimum | NO DEDUCTIONS 
  (not possible to deduct since the 'taxableAmount' is regarding profit in that case. And profit is < 0 here)

*/
describe('TaxCalculator for Dividende & 30% ruling', () => {

    const minGrossSalary = 37000 / (1 - 0.3);
    const incomeTaxDiv30Ruling: IncomeTax = incomeTaxFactoryDiv30Ruling();

    describe('Above minimum', () => {
        describe('No deductions', () => {
            test('Money left is: Money made minus the sum of all expenses', () => {
                const moneyMade = 60000;
                givenStaticCosts({
                    runningCosts: 500,
                    healthInsuranceCost: 1000
                })
                    .whenMakingInAYear(moneyMade)
                    .moneyLeftIs(moneyMade - incomeTaxDiv30Ruling(moneyMade) - 500 - 1000);
            });
        });
        // TODO: Implement tests with some deductions !! (Update `givenStaticCosts(...)` function)
    });

    describe('Below minimum', () => {
        describe('No deductions (only possible scenarion when below minimum)', () => {
            test('Money left is: Money made minus (costs and TAX FOR MINIMUM SALARY)', () => {
                /* 
                The tax for MINIMUM SALARY needs to be deducted from the money left REGARDLESS of the money made
                (if below minimum)
                */
                const moneyMade = 20000;
                givenStaticCosts({
                    runningCosts: 500,
                    healthInsuranceCost: 1000
                })
                    .whenMakingInAYear(moneyMade)
                    .moneyLeftIs(moneyMade - incomeTaxDiv30Ruling(minGrossSalary) - 500 - 1000);
            });
        });
    });

    /** This version uses the REAL implementation of the `IncomeTax` calculator for the Div30Ruling scenario */
    function givenStaticCosts(costs: StaticCosts) {
        /* No deductible amounts for now !! */
        const taxableAmountFn: TaxableAmount =
            (grossYearly: number, deductions: number) => 0;

        const runningCostsFn: RunningCosts =
            (grossYearly: number) => costs.runningCosts;
        const healthInsuranceCostFn: HealthInsuranceCost =
            (grossYearly: number) => costs.healthInsuranceCost;

        const taxCalculator: TaxCalculator = new TaxCalculatorDiv30Ruling(
            incomeTaxDiv30Ruling,
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
