import Interpolator, { InterpolatedFunction, Point } from '../domain/interface/Interpolator';

export class SplineInterpolator implements Interpolator {
    guessFunction(interpolationPoints: Point[]): InterpolatedFunction {
        throw new Error('Method not implemented.');
    }
}