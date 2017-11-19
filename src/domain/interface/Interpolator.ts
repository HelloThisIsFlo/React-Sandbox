export interface Point {
    x: number;
    y: number;
}
export type InterpolatedFunction = ((x: number) => number);
export default interface Interpolator {
    /**
     * Use an interpolation to guess the function that
     * links all the points together.
     */
    guessFunction(interpolationPoints: Point[]): InterpolatedFunction;

}