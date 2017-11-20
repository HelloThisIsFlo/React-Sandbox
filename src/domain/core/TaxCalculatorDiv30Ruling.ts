import TaxCalculator from './TaxCalculator';
import GrossToNetDividende30Ruling, {
     RunningCostsDividende30Ruling, 
     HealthInsuranceDividende30Ruling, 
     DeductionsDividende30Ruling 
    } from './tax_calculator/div30Ruling/GrossToNet';

export default class TaxCalculatorDividende30Ruling implements TaxCalculator {

    private grossToNet: GrossToNetDividende30Ruling;
    private runningCosts: RunningCostsDividende30Ruling;
    private healthInsurance: HealthInsuranceDividende30Ruling;
    private deductions: DeductionsDividende30Ruling;

    constructor(
        grossToNet: GrossToNetDividende30Ruling,
        runningCosts: RunningCostsDividende30Ruling,
        healthInsurance: HealthInsuranceDividende30Ruling,
        deductions: DeductionsDividende30Ruling) {
        this.grossToNet = grossToNet;
        this.runningCosts = runningCosts;
        this.healthInsurance = healthInsurance;
        this.deductions = deductions;
    }

    moneyLeftAfterAllExpenses(moneyMade: number): number {
        throw new Error('Method not implemented.');
    }

}