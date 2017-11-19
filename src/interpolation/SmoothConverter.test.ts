import smoothPathConverter from './SmoothConverter';
import { SmoothPath, Smooth, smoothFactory, SmoothPoint } from './external_library/Smooth';
import { InterpolatedFunction } from '../domain/interface/Interpolator';

/**
 * For the entirety of this test, only linear interpolation is used. (Only interpolating straight lines between points)
 * The goal is to test the converter, not the interpolation itself.
 */
describe('SmoothPath Converter', () => {
    const smooth: Smooth = smoothFactory();

    var f: InterpolatedFunction;

    describe('2 points path: x => x', () => {
        const points: SmoothPoint[] = [
            [2, 2],
            [4, 4]
        ];

        beforeEach(() => {
            f = smoothPathConverter(
                smooth(points, { method: 'linear' }), 
                points.length
            );
        });

        test('3 => 3', () => {
            expect(f(3)).toEqual(3);
        });

        test('2.7 => 2.7', () => {
            expect(f(2.7)).toEqual(2.7);
        });

        test('Outside the range of interpolation', () => {
            expect(() => f(1)).toThrowError('x: 1 is outside the range of interpolation: [ 2, 4 ] !!');
        });

    });

    describe.only('3 points path: x => 2x, then x => 0.5x + a (a=6)', () => {
        const ptA: SmoothPoint = [2, 4];
        const ptB: SmoothPoint = [4, 8];
        const ptC: SmoothPoint = [8, 9];
        /*
        On A->B: x => 2x
        On B->C: x => 0.5x + const (const=6)
        */
        const points: SmoothPoint[] = [
            ptA,
            ptB,
            ptC
        ];

        beforeEach(() => {
            f = smoothPathConverter(
                smooth(points, { method: 'linear' }), 
                points.length
            );
        });

        test('Outside the range of interpolation', () => {
            expect(() => f(1)).toThrowError('x: 1 is outside the range of interpolation: [ 2, 8 ] !!');
        });

        test('At interpolated points', () => {
            points.map(pt => {return {x: pt[0], y: pt[1]}; })
            .forEach(pt => {
                expect(f(pt.x)).toEqual(pt.y);
            });
        });

        test('First segment', () => {
            expect(f(3)).toBeCloseTo(6, 0);
            expect(f(3.5)).toBeCloseTo(7, 0);
            expect(f(2.1)).toBeCloseTo(4.2, 0);
        });

        test('Second segment', () => {
            assert(f(6)).almostEqual(6 * 0.5 + 6);
            assert(f(4.1)).almostEqual(4.1 * 0.5 + 6);
        });

    });

});

function assert(a: number) {
    const margin = 0.5;
    return {
        almostEqual: function(b: number) {
            expect(a).toBeLessThanOrEqual(b + margin);
            expect(a).toBeGreaterThanOrEqual(b - margin);
        }
    };
}