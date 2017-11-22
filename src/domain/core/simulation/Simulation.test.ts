import Simulation, { SimulationImpl, SimulationInput, SimulationResult } from './Simulation';

describe('Simulation over 8 years', () => {

    let simulation: Simulation;

    beforeEach(() => {
        simulation = new SimulationImpl();
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
         * - ZZP === (x -> 
         * 
         */
        beforeAll(() => {
            return;
        });

        test('No money made ever => Keep loosing money', () => {
            expectSimulation(0, 0, 0, 0, 0, 0, 0, 0)
                .toReturn
                .year5_netProfit(0)
                .year7_cumulatedNetProfits(0)
                .year3_moneyLeftDiv30Ruling(0)
                .year2_moneyLeftZzp(0);
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
        const year3 = result[2];
        const year5 = result[4];
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

                year3_moneyLeftDiv30Ruling: function (expected: number) {
                    expect(year3.moneyLeftDiv30Ruling).toEqual(expected);
                    return this;
                }
            }
        };
    }

    const toSimulationInput =
        (moneyMade: number, index: number): SimulationInput =>
            ({ currentYear: index + 1, moneyMadeDuringTheYear: moneyMade });
});