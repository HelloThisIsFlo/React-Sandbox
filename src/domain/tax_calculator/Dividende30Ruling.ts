import { Deductions, GrossToNet, HealthInsurance, RunningCosts } from '../TaxCalculator';

export class GrossToNetDividende30Ruling implements GrossToNet {
    calculateNetYearly(grossYearly: number): number {
        throw new Error('Not yet implemeneted');
    }
}
export class RunningCostsDividende30Ruling implements RunningCosts {
    calculateRunningCosts(grossYearly: number): number {
        throw new Error('Not yet implemeneted');
    }
}
export class HealthInsuranceDividende30Ruling implements HealthInsurance {
    calculateHealthInsuranceCosts(grossYearly: number): number {
        throw new Error('Not yet implemeneted');
    }
}
export class DeductionsDividende30Ruling implements Deductions {
    calculateTaxableAmount(grossYearly: number): number {
        throw new Error('Not yet implemeneted');
    }
}
