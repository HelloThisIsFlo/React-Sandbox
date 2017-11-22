import TaxCalculator, { RunningCosts, HealthInsuranceCost, TaxableAmount, IncomeTax } from '../TaxCalculator';

export function runningCostsDiv30Ruling(grossYearly: number) {
    return 0;
}
export function healthInsuranceCostDiv30Ruling(grossYearly: number) {
    return 0;
}
export function taxableAmountDiv30Ruling(grossYearly: number, deductions: number) {
    throw 'Not implemented yet!';
}

export default class TaxCalculatorDiv30Ruling implements TaxCalculator {

    private minTaxableSalaryForScheme = 37000;
    private minGrossSalaryForScheme = this.minTaxableSalaryForScheme / (1 - 0.30);

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

        let incomeTax;
        if (moneyMade >= this.minGrossSalaryForScheme) {
            incomeTax = this.incomeTax(moneyMade);
        } else {
            incomeTax = this.incomeTax(this.minGrossSalaryForScheme);
        }

        const runningCosts = this.runningCosts(moneyMade);
        const healthInsuranceCost = this.healthInsuranceCost(moneyMade);

        return moneyMade - incomeTax - runningCosts - healthInsuranceCost;
    }

}