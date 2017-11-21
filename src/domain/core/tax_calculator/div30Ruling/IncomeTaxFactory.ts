import { IncomeTax, Percent } from '../../TaxCalculator';
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
/**
 * Create a IncomeTax calculator for the Dividende & 30% ruling scheme.
 */
export default function incomeTaxDiv30Ruling(): IncomeTax {

    const minTaxSalary = 37000;
    const netForMinTaxSalary = 43203;

    /**
     * The 'IncomeTax' in the case of the Dividende & 30% ruling corresponds to 
     * the difference between:
     * - The total gross ammount received on personal account 
     *   * Minimum: 53k in raw salary
     *   * Above: 53K + rest in dividendes
     * - The total net ammount left on personal account 
     * 
     * That correspond to a "equivalent" Income Tax. 
     * But is really a mix of 'Income Tax', 'Profit Tax' and 'Dividende Tax'.
     * 
     * @param grossYearly 
     */
    const incomeTax: IncomeTax = function (grossYearly: number): number {
        const taxable = minus30Percent(grossYearly);

        if (taxable <= minTaxSalary) {
            throw `${grossYearly} is below the minimum amount for this scheme`;
        } else {
            return applyDividendStrategy(grossYearly);
        }
    };

    return incomeTax;

    function applyDividendStrategy(grossYearly: number) {
        /*
        If above minimum (~=53k) 
        --> Only apply tax for ~=53k and give the rest as dividend.
        */
        const grossForMinTaxable = minTaxSalary / (1 - 30 / 100);
        const dividend = grossYearly - grossForMinTaxable;
        const dividendAfterProfitTax = applyTax(dividend, profitTax.under200k);
        const dividendNet = applyTax(dividendAfterProfitTax, dividendTax.whenIn30Ruling);

        return grossYearly - (dividendNet + netForMinTaxSalary);
    }

    function minus30Percent(gross: number): number {
        return gross * (1 - 0.3);
    }

    function applyTax(value: number, tax: Percent) {
        return value * (1 - tax / 100);
    }

}