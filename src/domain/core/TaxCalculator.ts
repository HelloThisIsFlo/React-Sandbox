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

    /**
     * Calculations for: The 30%ruling + dividende scheme
     */
    moneyLeftAfter30RulingAndDividende(moneyMade: number): number;

    /**
     * Calculations for: As ZZP
     */
    moneyLeftAfterZZP(moneyMade: number): number;
}

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
type TaxableAmount = number;
export interface Deductions {
    calculateTaxableAmount(grossYearly: number): TaxableAmount;
}
