import makeSelectable from 'material-ui/List/makeSelectable';
import { IncomeTax } from '../../TaxCalculator';
import { SplineInterpolator } from '../../../../interpolation/InterpolatorImpl';
import incomeTaxFactoryZzp from './IncomeTaxFactory';

describe('Gross to Net', () => {

    var incomeTaxZzp: IncomeTax;

    beforeEach(() => {
        const interpolator = new SplineInterpolator();
        incomeTaxZzp = incomeTaxFactoryZzp(interpolator);
    });

    test('Below 24000 -> Not taxes', () => {
        expectGross(0).returnsIncomeTax(0);
        expectGross(10000).returnsIncomeTax(0);
        expectGross(24000).returnsIncomeTax(0);
    });

    test('Fixed values from external calculator', () => {
        /*
        These values were calculated with an external tool.
        You can find it here: 
        https://www.ikwordzzper.nl/zzp-stappenplan/handige-hulpmiddelen/netto-besteedbaar-inkomen-calculator-zzp
        */
        expectGross(25000).returnsIncomeTax(916);
        expectGross(28000).returnsIncomeTax(1998);
        expectGross(32000).returnsIncomeTax(3557);
        expectGross(38000).returnsIncomeTax(6388);
        expectGross(42000).returnsIncomeTax(8285);
        expectGross(46000).returnsIncomeTax(10183);
        expectGross(48000).returnsIncomeTax(11132);
        expectGross(50000).returnsIncomeTax(12081);
        expectGross(55000).returnsIncomeTax(19499);
        expectGross(60000).returnsIncomeTax(21871);
        expectGross(70000).returnsIncomeTax(26616);
        expectGross(100000).returnsIncomeTax(40247);
        expectGross(120000).returnsIncomeTax(49911);
    });

    function expectGross(gross: number) {
        const acceptableRangePercent = 1.5;
        return {
            /**
             * Assert if result is approximately correct.
             * The calculator doesn't need to be super precise so an approximation will do.
             */
            returnsIncomeTax: function (expectedIncomeTax: number) {
                // +/- the range in percent will be considered ok;
                const incomeTax = incomeTaxZzp(gross);
                const margin = acceptableRangePercent / 100 * expectedIncomeTax;
                expect(incomeTax).toBeLessThanOrEqual(expectedIncomeTax + margin);
                expect(incomeTax).toBeGreaterThanOrEqual(expectedIncomeTax - margin);
            }
        };
    }
});
