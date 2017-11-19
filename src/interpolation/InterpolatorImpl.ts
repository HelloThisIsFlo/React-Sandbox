import smoothPathConverter from './SmoothConverter';
import Interpolator, { InterpolatedFunction, Point } from '../domain/interface/Interpolator';
import { smoothFactory, SmoothPath } from './external_library/Smooth';

const smooth = smoothFactory();

export class SplineInterpolator implements Interpolator {

    guessFunction(interpolationPoints: Point[]): InterpolatedFunction {

        const pts = interpolationPoints
            .map(this.mapToSmoothPointType);

        const path: SmoothPath = smooth(pts, { method: 'cubic' });

        return smoothPathConverter(path, pts.length);
    }

    mapToSmoothPointType(point: Point): [number, number] {
        return [point.x, point.y];
    }
}