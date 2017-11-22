
export type SimulationInput = {
    currentYear: number;
    moneyMadeDuringTheYear: number;
};
export type SimulationResult = {
    currentYear: number;
    netProfitIfUsingDiv30Ruling: number;
    cumulatedNetProfitsIfUsingDiv30Ruling: number;
    moneyLeftZZP: number;
    moneyLeftDiv30Ruling: number;
};

export default interface Simulation {
    over8Years(input: SimulationInput[]): SimulationResult[];
}

export class SimulationImpl implements Simulation {

    over8Years(input: SimulationInput[]): SimulationResult[] {
        if (input.length !== 8) {
            throw new Error(`Simulation must be exactly 8 years but was ${input.length}`);
        }

        return input.map(inputYear => ({
            currentYear: inputYear.currentYear,
            netProfitIfUsingDiv30Ruling: 0,
            cumulatedNetProfitsIfUsingDiv30Ruling: 0,
            moneyLeftZZP: 0,
            moneyLeftDiv30Ruling: 0
        }));
    }

}