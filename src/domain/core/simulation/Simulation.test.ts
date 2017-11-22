import Simulation, { SimulationImpl, SimulationInput, SimulationResult } from './Simulation';
import TaxCalculator from '../tax_calculator/TaxCalculator';

describe('Simulation over 8 years', () => {

    let simulation: Simulation;
    /*
     * To simplify the calculations mock 'TaxCalculator' are used.
     * 
     * 'TaxCalculators' are used to encompass all tax, expenses, maintenance costs ... and
     * return a simple to understand mapping from:
     *     Money made in a Year ==> Money left on account. Net of EVERYTHING
     * 
     * The idea is that:
     * - 'Div30Ruling': is less profitable at low salaries & more profitable at high salaries
     * - 'ZZP': is more profitable at low salaries & less profitable at high salaries
     * 
     * Unfortunately if we go with one or the other, there is no way to change later.
     * - zzp => div30: Not possible because loss of 30% ruling
     * - div30 => zzp: "Possible" but sucks because:
     *                  Loosing a lot of money in the first years is expected with div30, but if
     *                  then switching to zzp. All that money lost won't ever balance itself with extra profits 
     *                  in the later years
     * 
     * A simple modelisation can then be:
     * - ZZP:
     *   * moneyLeft === moneyMade * 0.5
     *   * x -> 0.5 * x
     * 
     * - Div30Ruling:
     *   * moneyLeft === moneyMade * 0.75 - 11500
     *   * x -> 0.75 x - 11500
     * 
     * They intersect when: x === 46000
     * (~= close to real scenario)
     * 
     */
    const zzpCalculator: TaxCalculator = {
        moneyLeftAfterAllExpenses: (moneyMade: number) => moneyMade * 0.5
    };
    const div30RulingCalculator: TaxCalculator = {
        moneyLeftAfterAllExpenses: (moneyMade: number) => moneyMade * 0.75 - 11500
    };
    beforeAll(() => {
        simulation = new SimulationImpl(zzpCalculator, div30RulingCalculator);
    });

    describe('Egde cases', () => {
        test('More than 8 years => Error', () => {
            const moreThan8Years: SimulationInput[] = [
                { currentYear: 1, moneyMadeDuringTheYear: 0 },
                { currentYear: 2, moneyMadeDuringTheYear: 0 },
                { currentYear: 3, moneyMadeDuringTheYear: 0 },
                { currentYear: 4, moneyMadeDuringTheYear: 0 },
                { currentYear: 5, moneyMadeDuringTheYear: 0 },
                { currentYear: 6, moneyMadeDuringTheYear: 0 },
                { currentYear: 7, moneyMadeDuringTheYear: 0 },
                { currentYear: 8, moneyMadeDuringTheYear: 0 },
                { currentYear: 9, moneyMadeDuringTheYear: 0 },
                { currentYear: 10, moneyMadeDuringTheYear: 0 }
            ];

            expect(() => {
                simulation.over8Years(moreThan8Years);
            }).toThrowError('Simulation must be exactly 8 years but was 10');
        });

        test('Less than 8 years => Error', () => {
            const lessThan8Years: SimulationInput[] = [
                { currentYear: 1, moneyMadeDuringTheYear: 0 },
                { currentYear: 2, moneyMadeDuringTheYear: 0 },
                { currentYear: 3, moneyMadeDuringTheYear: 0 },
                { currentYear: 4, moneyMadeDuringTheYear: 0 },
                { currentYear: 5, moneyMadeDuringTheYear: 0 },
                { currentYear: 6, moneyMadeDuringTheYear: 0 },
            ];

            expect(() => {
                simulation.over8Years(lessThan8Years);
            }).toThrowError('Simulation must be exactly 8 years but was 6');
        });
    });

    test('Generate result has correct index', () => {
        const input = [0, 0, 0, 0, 0, 0, 0, 0].map(toSimulationInput);
        const res = simulation.over8Years(input);

        expect(res).toHaveLength(8);
        res.forEach(
            (result, index) => expect(result.currentYear).toEqual(index + 1)
        );
    });

    describe('Actual scenario', () => {
        test('No money made ever => Keep loosing money', () => {
            const leftDiv30 = div30RulingCalculator.moneyLeftAfterAllExpenses(0);
            const leftZzp = zzpCalculator.moneyLeftAfterAllExpenses(0);
            const lossEachYear = leftDiv30 - leftZzp;

            expectSimulation(0, 0, 0, 0, 0, 0, 0, 0)
                .toReturn
                .year5_netProfit(lossEachYear)
                .year7_cumulatedNetProfits(7 * lossEachYear)
                .year6_moneyLeftDiv30Ruling(leftDiv30)
                .year2_moneyLeftZzp(leftZzp);
        });

        test('Making 30000 for 4 years, then 60000 for 4 years', () => {
            function calculatePart(moneyMade: number) {
                const leftDiv30 = div30RulingCalculator.moneyLeftAfterAllExpenses(moneyMade);
                const leftZzp = zzpCalculator.moneyLeftAfterAllExpenses(moneyMade);
                const netProfitEachYear = leftDiv30 - leftZzp;

                return {
                    leftDiv30: leftDiv30,
                    leftZzp: leftZzp,
                    netProfitEachYear: netProfitEachYear
                };
            }
            const firstPart = calculatePart(30000);
            const secondPart = calculatePart(60000);

            expectSimulation(30000, 30000, 30000, 30000, 60000, 60000, 60000, 60000)
                .toReturn
                .year5_netProfit(secondPart.netProfitEachYear)
                .year7_cumulatedNetProfits(
                    4 * firstPart.netProfitEachYear + 3 * secondPart.netProfitEachYear
                )
                .year6_moneyLeftDiv30Ruling(secondPart.leftDiv30)
                .year2_moneyLeftZzp(firstPart.leftZzp);
        });

    });

    /**
     * Test the simulation. 
     * 
     * Not all values are tested, only some. 
     * 
     * That is enough to ensure the integrity of the 'Simulation' implementation without
     * obstructing readability
     * @param simulationInput Input for the simulation to test
     */
    function expectSimulation(...moneyMadeEachYear: number[]) {

        const simulationInput = moneyMadeEachYear.map(toSimulationInput);
        const result: SimulationResult[] = simulation.over8Years(simulationInput);

        const year2 = result[1];
        const year5 = result[4];
        const year6 = result[5];
        const year7 = result[6];

        return {
            toReturn: {
                year5_netProfit: function (expected: number) {
                    expect(year5.netProfitIfUsingDiv30Ruling).toEqual(expected);
                    return this;
                },

                year7_cumulatedNetProfits: function (expected: number) {
                    expect(year7.cumulatedNetProfitsIfUsingDiv30Ruling).toEqual(expected);
                    return this;
                },

                year2_moneyLeftZzp: function (expected: number) {
                    expect(year2.moneyLeftZZP).toEqual(expected);
                    return this;
                },

                year6_moneyLeftDiv30Ruling: function (expected: number) {
                    expect(year6.moneyLeftDiv30Ruling).toEqual(expected);
                    return this;
                }
            }
        };
    }

    const toSimulationInput =
        (moneyMade: number, index: number): SimulationInput =>
            ({ currentYear: index + 1, moneyMadeDuringTheYear: moneyMade });
});