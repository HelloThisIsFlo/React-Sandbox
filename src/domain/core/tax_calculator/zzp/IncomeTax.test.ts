import makeSelectable from 'material-ui/List/makeSelectable';
import { IncomeTax } from '../../TaxCalculator';
import GrossToNetZzp from './GrossToNet';

describe('Gross to Net', () => {

    var grossToNet: IncomeTax;

    beforeEach(() => {
        grossToNet = new GrossToNetZzp();
    });

    test('0 income', () => {
        assertGrossToNet(0, 0);
    });

    test('Below 24000 -> Not taxes', () => {
        assertGrossToNet(10000, 10000);
        assertGrossToNet(24000, 24000);
    });

    test('Fixed values from external calculator', () => {
        /*
        These values were calculated with an external tool.
        You can find it here: 
        https://www.ikwordzzper.nl/zzp-stappenplan/handige-hulpmiddelen/netto-besteedbaar-inkomen-calculator-zzp
        */

        // assertGrossToNet(24000, 23445);
        assertGrossToNet(25000, 24084);
        assertGrossToNet(28000, 26002);
        assertGrossToNet(32000, 28443);
        assertGrossToNet(38000, 31612);
        assertGrossToNet(42000, 33715);
        assertGrossToNet(46000, 35817);
        assertGrossToNet(48000, 36868);
        assertGrossToNet(50000, 37919);
        assertGrossToNet(55000, 35501);
        assertGrossToNet(60000, 38129);
        assertGrossToNet(70000, 43384);
        assertGrossToNet(100000, 59753);
        assertGrossToNet(120000, 70089);
    });

    /**
     * Assert if result is approximately correct.
     * The calculator doesn't need to be super precise so an approximation will do.
     */
    function assertGrossToNet(gross: number, expectedNet: number) {
        // +/- the range in percent will be considered ok;
        const acceptableRangePercent = 1.5;
        const net = grossToNet.calculateNetYearly(gross);
        const margin = acceptableRangePercent / 100 * expectedNet;
        expect(net).toBeLessThanOrEqual(expectedNet + margin);
        expect(net).toBeGreaterThanOrEqual(expectedNet - margin);
    }

});
