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

    function assertGrossToNet(gross: number, expectedNet: number) {
        const net = grossToNet.calculateNetYearly(gross);
        expect(net).toEqual(expectedNet);
    }

});
