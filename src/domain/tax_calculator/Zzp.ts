import { Deductions, GrossToNet, HealthInsurance, RunningCosts } from '../TaxCalculator';

export class GrossToNetZzp implements GrossToNet {

    externalMapping = [
        { gross: 55000, net: 35501 },
        // { gross: 60000, net: 38129 },
        // { gross: 70000, net: 43384 },
        // { gross: 100000, net: 59753 },
        { gross: 120000, net: 70089 }
    ];

    calculateNetYearly(grossYearly: number): number {
        const fromExternalMapping =
            this.externalMapping
                .find((value) => value.gross === grossYearly);

        return fromExternalMapping ?
            fromExternalMapping.net :
            this.calculateExtrapolatedValue(grossYearly);
    }

    private calculateExtrapolatedValue(grossYearly: number): number {
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
