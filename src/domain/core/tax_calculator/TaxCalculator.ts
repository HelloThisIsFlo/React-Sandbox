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
export interface IncomeTax { (grossYearly: number): number; }
export interface RunningCosts { (grossYearly: number): number; }
export interface HealthInsuranceCost { (grossYearly: number): number; }
export interface TaxableAmount { (grossYearly: number, deductions: number): number; }
