import TaxCalculator from './TaxCalculator';
import GrossToNetZzp, { RunningCostsZzp, HealthInsuranceZzp, DeductionsZzp } from './tax_calculator/zzp/GrossToNet';

export default class TaxCalculatorZzp implements TaxCalculator {

    private grossToNet: GrossToNetZzp;
    private runningCosts: RunningCostsZzp;
    private healthInsurance: HealthInsuranceZzp;
    private deductions: DeductionsZzp;

    constructor(
        grossToNet: GrossToNetZzp,
        runningCosts: RunningCostsZzp,
        healthInsurance: HealthInsuranceZzp,
        deductions: DeductionsZzp) {
        this.grossToNet = grossToNet;
        this.runningCosts = runningCosts;
        this.healthInsurance = healthInsurance;
        this.deductions = deductions;
    }

    moneyLeftAfterAllExpenses(moneyMade: number): number {
        throw new Error('Method not implemented.');
    }

}