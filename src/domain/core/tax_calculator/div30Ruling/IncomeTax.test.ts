import { IncomeTax, Percent } from '../../TaxCalculator';
import incomeTaxFactoryDiv30Ruling, { DividendTax, ProfitTax } from './IncomeTaxFactory';

describe('Gross to Net', () => {
    /*
    TODO: PUT THIS SOMEWHERE ELSE

    With this scheme, if the salary is < 53k we're basically wasting money.
    Because for it to work the taxable income AFTER the 30% were removed needs to be 
    37k. Which is equivalentto 53k BEFORE 30%.

    Anything below and we'll still pay taxes on the 37k.

    For the sake of clarity
    */

    const minTaxable = 37000;
    const grossForMinTaxable = minTaxable / (1 - 0.3);
    const netForMinTaxable = 43203;

    /**
     * Dividend tax is 15%. 
     * BUT if having a substantial interest in the company it raises to
     * 25%
     * 
     * However if under the 30% ruling, that substantial interest box (box 2)
     * is not taxed. Therefore it falls back to 15%.
     */
    // TODO: Put this in some configuration object
    const dividendTax: DividendTax = {
        whenIn30Ruling: 15,
        regularRate: 25
    };
    const profitTax: ProfitTax = {
        under200k: 20,
        over200k: 25
    };

    const incomeTax: IncomeTax = incomeTaxFactoryDiv30Ruling();

    test('Below Minimum (approx 53K) => Error', () => {
        /*
        This scheme only works if the SALARY is < minimum (~=53k) !!

        The money made in a year might be less. But the gross -> net is always in regards to the salary.
        Since the salary can not be lower that the minimum ==> Error
        */

        function assertInvalidGross(gross: number) {
            expect(() => incomeTax(gross))
                .toThrowError(`${gross} is below the minimum amount for this scheme`);
        }

        [10000, 20000, 24000, 52000]
            .map(assertInvalidGross);
    });

    describe('Above minimum => Apply dividende scheme', () => {
        /*
        If above minimum (~=53k) 
        --> Only apply tax for ~=53k and give the rest as dividend.
        */

        const gross = 70000;
        const dividend = gross - grossForMinTaxable;
        const dividendAfterProfitTax = applyTax(dividend, profitTax.under200k);
        const dividendNet = applyTax(dividendAfterProfitTax, dividendTax.whenIn30Ruling);

        const expectedNet = dividendNet + netForMinTaxable;

        assertGross(gross).givesNet(expectedNet);
    });

    function applyTax(value: number, tax: Percent) {
        return value * (1 - tax / 100);
    }

    function assertGross(gross: number) {
        return {
            givesNet: function (expectedNet: number) {
                const resNet = incomeTax(gross);
                expect(resNet).toBeCloseTo(expectedNet);
            }
        };
    }

});