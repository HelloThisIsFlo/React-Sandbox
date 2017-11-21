import TaxCalculator, { RunningCosts, HealthInsuranceCost, TaxableAmount, IncomeTax } from '../TaxCalculator';

export function runningCostsZzp(grossYearly: number) {
    return 0;
}
export function healthInsuranceCostZzp(grossYearly: number) {
    return 0;
}
export function taxableAmountZzp(grossYearly: number, deductions: number) {
    throw 'Not implemented yet!';
}

export default class TaxCalculatorZzp implements TaxCalculator {

    private incomeTax: IncomeTax;
    private runningCosts: RunningCosts;
    private healthInsuranceCost: HealthInsuranceCost;
    private taxableAmount: TaxableAmount;

    constructor(
        incomeTax: IncomeTax,
        runningCosts: RunningCosts,
        healthInsuranceCost: HealthInsuranceCost,
        taxableAmount: TaxableAmount) {
        this.incomeTax = incomeTax;
        this.runningCosts = runningCosts;
        this.healthInsuranceCost = healthInsuranceCost;
        this.taxableAmount = taxableAmount;
    }

    moneyLeftAfterAllExpenses(moneyMade: number): number {
        throw new Error('Method not implemented.');
    }
}