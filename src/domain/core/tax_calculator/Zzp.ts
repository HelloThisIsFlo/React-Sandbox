import { Deductions, GrossToNet, HealthInsurance, RunningCosts } from '../TaxCalculator';
import Interpolator, { InterpolatedFunction } from '../../interface/Interpolator';
import { SplineInterpolator } from '../../../interpolation/InterpolatorImpl';

export class GrossToNetZzp implements GrossToNet {

    interpolator: Interpolator = new SplineInterpolator(); // todo inject

    // TODO: Add move values for range [55000 --> 12000]
    externalMapping = [
        { gross: 24000, net: 23445 },
        { gross: 25000, net: 24084 },
        { gross: 28000, net: 26002 },
        { gross: 32000, net: 28443 },
        { gross: 38000, net: 31612 },
        { gross: 42000, net: 33715 },
        { gross: 46000, net: 35817 },
        { gross: 48000, net: 36868 },
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
    // TODO: Add move values for range [55000 --> 12000]
        { gross: 50000, net: 37919 },
        { gross: 55000, net: 35501 },
        { gross: 60000, net: 38129 },
        { gross: 70000, net: 43384 },
        { gross: 100000, net: 59753 },
        { gross: 120000, net: 70089 }
    ];

    grossToNetApproximation: InterpolatedFunction;

    constructor() {
        this.grossToNetApproximation = this.interpolator.guessFunction(
            this.externalMapping.map(grossNet => { return {
                x: grossNet.gross,
                y: grossNet.net
            }; })
        );
    }

    calculateNetYearly(grossYearly: number): number {
        if (grossYearly <= 24000) { return 0; }

        const fromExternalMapping =
            this.externalMapping
                .find((value) => value.gross === grossYearly);

        return fromExternalMapping ?
            fromExternalMapping.net :
            this.calculateInterpolatedValue(grossYearly);
    }

    private calculateInterpolatedValue(grossYearly: number): number {
        return this.grossToNetApproximation(grossYearly);
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
