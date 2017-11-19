import Interpolator, { InterpolatedFunction, Point } from '../domain/interface/Interpolator';
import { SplineInterpolator } from './InterpolatorImpl';
describe.skip('Spline interpolator', () => {

    var splineInterpolator: Interpolator;

    beforeEach(() => { 
        splineInterpolator = new SplineInterpolator();
    });

    describe('2 values: x => x', () => {

        var interpolatedFunction: InterpolatedFunction;
        var points = [
            {x: 2, y: 2},
            {x: 4, y: 4}
        ];

        beforeEach(() => { 
            interpolatedFunction = splineInterpolator.guessFunction(points);
        });

        test('initial values correctly interpolated', () => {
            assertIntersection(points[0], interpolatedFunction);
            assertIntersection(points[1], interpolatedFunction);
        });

        test('3 => 3', () => {
            assertIntersection({x: 3, y: 3}, interpolatedFunction);
        });

        /**
         * Asserts taht the function approximately intersect with the given function.
         * Passes when the resulting 'y' is +/- 5% equal to the expectation 
         * (where y = f(x) in func: x -> f(x) = y)
         */
        function assertIntersection(point: Point, func: InterpolatedFunction)  {
            const expectedY = point.y;
            const margin = 0.05 * expectedY;

            const interpolatedY = func(point.x);

            expect(interpolatedY).toBeLessThanOrEqual(expectedY + margin);
            expect(interpolatedY).toBeGreaterThanOrEqual(expectedY - margin);
        }

    });
});