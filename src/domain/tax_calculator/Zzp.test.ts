import { GrossToNet } from '../TaxCalculator';
import { GrossToNetZzp } from './Zzp';
describe('Gross to Net', () => {

    var grossToNet: GrossToNet;

    beforeEach(() => {
        grossToNet = new GrossToNetZzp();
    });

    test('0 income', () => {
        assertGrossToNet(0, 0);
    });

    test('Below 24000 -> Not taxes', () => {
        assertGrossToNet(24000, 0);
    });

    test('Fixed values from external calculator', () => {
        /*
        These values were calculated with an external tool.
        You can find it here: 
        https://www.ikwordzzper.nl/zzp-stappenplan/handige-hulpmiddelen/netto-besteedbaar-inkomen-calculator-zzp

        The calculator doesn't need to be super precise so an approximation will do.
        */
        assertGrossToNet(55000, 35501);
        // assertGrossToNet(60000, 38129);
        // assertGrossToNet(70000, 43384);
        // assertGrossToNet(100000, 59753);
        assertGrossToNet(120000, 70089);
    });

    function assertGrossToNet(gross: number, expectedNet: number) {
        const net = grossToNet.calculateNetYearly(gross);
        expect(net).toEqual(expectedNet);
    }

});
