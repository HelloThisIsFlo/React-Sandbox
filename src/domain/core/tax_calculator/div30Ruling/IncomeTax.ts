import { Deductions, GrossToNet, HealthInsurance, RunningCosts, Percent } from '../TaxCalculator';

export type ProfitTax = {
    under200k: Percent;
    over200k: Percent;
};
export type DividendTax = {
    whenIn30Ruling: Percent;
    regularRate: Percent;
};
const dividendTax: DividendTax = {
    whenIn30Ruling: 15,
    regularRate: 25
};
const profitTax: ProfitTax = {
    under200k: 20,
    over200k: 25
};
export default class GrossToNetDividende30Ruling implements GrossToNet {

    private minTaxSalary = 37000;
    private netForMinTaxSalary = 43203;

    calculateNetYearly(grossYearly: number): number {
        const taxable = this.minus30Percent(grossYearly);

        if (taxable <= this.minTaxSalary) {
            throw `${grossYearly} is below the minimum amount for this scheme`;
        } else {
            return this.applyDividendStrategy(grossYearly);
        }
    }

    private applyDividendStrategy(grossYearly: number) {
        /*
        If above minimum (~=53k) 
        --> Only apply tax for ~=53k and give the rest as dividend.
        */
        const grossForMinTaxable = this.minTaxSalary / (1 - 30 / 100);
        const dividend = grossYearly - grossForMinTaxable;
        const dividendAfterProfitTax = this.applyTax(dividend, profitTax.under200k);
        const dividendNet = this.applyTax(dividendAfterProfitTax, dividendTax.whenIn30Ruling);
        return dividendNet + this.netForMinTaxSalary;
    }

    private minus30Percent(gross: number): number {
        return gross * (1 - 0.3);
    }

    private applyTax(value: number, tax: Percent) {
        return value * (1 - tax / 100);
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
