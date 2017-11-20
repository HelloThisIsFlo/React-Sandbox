/**
 * Calculates what is left on account after everything.
 * 
 * That includes:
 * - Net to Gross 
 * - Running cost. 
 * - Health insurances.
 * - Deductions. And how it applies in this specific case.
 */
export default interface TaxCalculator {
    moneyLeftAfterAllExpenses(moneyMade: number): number;
}

/* HELPER CLASSES */
export type Percent = number;
export interface GrossToNet {
    calculateNetYearly(grossYearly: number): number;
}
export interface RunningCosts {
    calculateRunningCosts(grossYearly: number): number;
}
export interface HealthInsurance {
    calculateHealthInsuranceCosts(grossYearly: number): number;
}
export interface Deductions {
    calculateTaxableAmount(grossYearly: number): number;
}
