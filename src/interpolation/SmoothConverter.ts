import Interpolator, { InterpolatedFunction, Point } from '../domain/interface/Interpolator';
import { smoothFactory, SmoothPath, SmoothPoint } from './external_library/Smooth';

const smooth = smoothFactory();

type Segment = {
    segmentNumber: number;
    start: Point;
    finish: Point;
};
export default function smoothPathConverter(path: SmoothPath, numOfInterpolatedPts: number): InterpolatedFunction {
    if (numOfInterpolatedPts < 2) { throw 'Number of interpolated points needs to be > 2 !!' }
    return x => {
        const segment: Segment = findSegment(x);

        const progress = segment.segmentNumber +  calculateProgressOnSegment(segment, x);
        const pointOnPath = toPoint(path(progress));

        return pointOnPath.y;
    };

    function findSegment(x: number): Segment {
        checkIfInRange(x);

        const interpolatedPoints = [];
        for (var i = 0; i < numOfInterpolatedPts; i++) {
            var pathPoint = path(i);
            var point: Point = {x: pathPoint[0], y: pathPoint[1]};
            interpolatedPoints.push(point);
        }

        var inSegment = false;
        var beginningSegment: Point;
        var endSegment: Point;
        var segmentNumber = -1;
        do {
            segmentNumber++;
            beginningSegment = interpolatedPoints[segmentNumber];
            endSegment = interpolatedPoints[segmentNumber + 1];

            inSegment = (beginningSegment.x <= x && x <= endSegment.x);
        } while (!inSegment);

        return {
            segmentNumber: segmentNumber,
            start: beginningSegment, 
            finish: endSegment
        };
    }

    function checkIfInRange(x: number) {
        const startX = path(0)[0];
        const endX = path(numOfInterpolatedPts - 1)[0];
        if (x < startX || x > endX) { 
            throw `x: ${x} is outside the range of interpolation: [ ${startX}, ${endX} ] !!`; 
        } 
    }
}

function toPoint(smoothPoint: SmoothPoint): Point {
    return {
        x: smoothPoint[0],
        y: smoothPoint[1],
    };
}
function calculateProgressOnSegment(segment: Segment, a: number): number {
    const startX = segment.start.x;
    const finishX = segment.finish.x;
    if (a < startX || a > finishX) {
        throw `'x':${a} not in segment: [${startX}, ${finishX}]`;
    }
    const distTotal = finishX - startX;
    const distFromStartToA = a - startX;

    const progress = distFromStartToA / distTotal;
    return progress;
}