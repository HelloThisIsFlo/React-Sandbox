import { Deductions, GrossToNet, HealthInsurance, RunningCosts } from '../TaxCalculator';

export class GrossToNetZzp implements GrossToNet {
    calculateNetYearly(grossYearly: number): number {
        return 0;
    }
}
export class RunningCostsZzp implements RunningCosts {
    calculateRunningCosts(grossYearly: number): number {
        throw new Error('Not implemented yet !!');
    }
}
export class HealthInsuranceZzp implements HealthInsurance {
    calculateHealthInsuranceCosts(grossYearly: number): number {
        throw new Error('Not implemented yet !!');
    }
}
export class DeductionsZzp implements Deductions {
    calculateTaxableAmount(grossYearly: number): number {
        throw new Error('Not implemented yet !!');
    }
}
