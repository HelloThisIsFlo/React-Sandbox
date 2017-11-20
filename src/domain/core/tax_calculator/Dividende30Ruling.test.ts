import { GrossToNet, Percent } from '../TaxCalculator';
import { GrossToNetDividende30Ruling, DividendTax, ProfitTax } from './Dividende30Ruling';
import { Point } from '../../interface/Interpolator';

describe('Gross to Net', () => {

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

    const grossToNet: GrossToNet = new GrossToNetDividende30Ruling();

    test('Below Minimum (approx 53K) => Charge taxes for (approx) 53K anyway', () => {
        /*
        With this scheme, if the salary is < 53k we're basically wasting money.
        Because for it to work the taxable income AFTER the 30% were removed needs to be 
        37k. Which is equivalentto 53k BEFORE 30%.

        Anything below and we'll still pay taxes on the 37k.
        */

        assertGross(10000).givesNet(netForMinTaxable);
        assertGross(15000).givesNet(netForMinTaxable);
        assertGross(25000).givesNet(netForMinTaxable);
        assertGross(grossForMinTaxable).givesNet(netForMinTaxable);
    });

    describe('Above minimum', () => {
        test('Apply dividende scheme', () => {
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
    });

    function applyTax(value: number, tax: Percent) {
        return value * (1 - tax / 100);
    }

    function assertGross(gross: number) {
        return {
            givesNet: function (expectedNet: number) {
                const resNet = grossToNet.calculateNetYearly(gross);
                expect(resNet).toBeCloseTo(expectedNet);
            }
        };
    }

});