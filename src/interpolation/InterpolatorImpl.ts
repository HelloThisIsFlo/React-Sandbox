
import Interpolator, { InterpolatedFunction, Point } from '../domain/interface/Interpolator';
import { smoothFactory } from './external_library/Smooth';

const smooth = smoothFactory();

export class SplineInterpolator implements Interpolator {

    // smooth: {};

    guessFunction(interpolationPoints: Point[]): InterpolatedFunction {

        const pts = interpolationPoints
            .map(this.mapToSmoothPointType);

        const interpolatedFunc = smooth(pts, { method: 'cubic' });

        return interpolatedFunc;
    }

    mapToSmoothPointType(point: Point): [number, number] {
        return [point.x, point.y];
    }
}