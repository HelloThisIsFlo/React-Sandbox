
/**
 * SmoothPath is not directly a function: x -> f(x) but a description of a Path.
 * 
 * Use the `smoothPathConverter` to convert a path to a function.
 * 
 * EXAMPLE:
 * 
 * If the Points to interpolate were: [ [2, 2], [6, 6] ]
 * Clearly the function f that associate y = f(x) where [ [x1, y1], [ x2, y2] ] were the points to interpolate is: x -> x, or f(x) = x;
 * 
 * However SmoothPath WON'T be that function.
 * SmoothPath will be a function that take the progression on the path, and return the resulting point [ x, y ].
 * 
 * Here there is only 2 values to interpolate: 
 * So the path only goes from the 1st to the 2nd, in other words from 0 to 1 (indexes of the points to interpolate)
 * 
 * To get the value of f(3) for instance we need to calculate what's the distance between 'x1' and 3, considering:
 * - x1 = 2
 * - 2 correspond to progress = 0
 * - 6 correspond to progress = 1
 * 
 * So: 
 * D(x2, x1) = 6 - 2 = 4
 * D( 3, x1) = 3 - 2 = 1
 * 
 * Progress_3 = D( 3, x1) / D(x2, x1) = 1/4
 * 
 * Finally: f(3) = SmoothPath(Progress_3)[1] = SmoothPath(1/4)[1] = [ 3, 3 ][1] = 3
 *                                        ^-- to keep only the 'y' component.
 */
type SmoothPoint = [number, number];
export type SmoothPath = (progressOnPath: number) => SmoothPoint;
export type Smooth = (values: SmoothPoint[], config: {}) => SmoothPath;

declare function smoothFactory(): Smooth;