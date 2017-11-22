import TaxCalculator from '../tax_calculator/TaxCalculator';

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

type StaticValues = {
    currentYear: number;
    netProfitIfUsingDiv30Ruling: number;
    moneyLeftZZP: number;
    moneyLeftDiv30Ruling: number;
};
export class SimulationImpl implements Simulation {

    private div30RulingCalculator: TaxCalculator;
    private zzpCalculator: TaxCalculator;

    constructor(zzpCalculator: TaxCalculator, div30RulingCalculator: TaxCalculator) {
        this.div30RulingCalculator = div30RulingCalculator;
        this.zzpCalculator = zzpCalculator;

        // This is to use the class members in the functions.
        // Because when passed by reference to `map` it looses the context of 
        // what is "this"
        this.calculateStaticValues = this.calculateStaticValues.bind(this);
    }

    over8Years(input: SimulationInput[]): SimulationResult[] {
        if (input.length !== 8) {
            throw new Error(`Simulation must be exactly 8 years but was ${input.length}`);
        }

        const made = input[0].moneyMadeDuringTheYear;

        const leftDiv30Ruling = this.div30RulingCalculator.moneyLeftAfterAllExpenses(made);
        const leftZzp = this.zzpCalculator.moneyLeftAfterAllExpenses(made);
        const lossPerYear = leftDiv30Ruling - leftZzp;

        return input
            .map(this.calculateStaticValues)
            .map(this.calculateCumulatedNetProfit);
    }

    private calculateStaticValues(year: SimulationInput): StaticValues {
        const leftDiv30Ruling = this.div30RulingCalculator.moneyLeftAfterAllExpenses(year.moneyMadeDuringTheYear);
        const leftZzp = this.zzpCalculator.moneyLeftAfterAllExpenses(year.moneyMadeDuringTheYear);
        const netProfitForCurrentYear = leftDiv30Ruling - leftZzp;
        return {
            currentYear: year.currentYear,
            netProfitIfUsingDiv30Ruling: netProfitForCurrentYear,
            moneyLeftZZP: leftZzp,
            moneyLeftDiv30Ruling: leftDiv30Ruling
        };
    }

    private calculateCumulatedNetProfit(year: StaticValues, index: number, allYears: StaticValues[]): SimulationResult {
        const cumulatedProfit = allYears
            .filter(y => y.currentYear <= year.currentYear)
            .map(y => y.netProfitIfUsingDiv30Ruling)
            .reduce((cumulatedUntilNow, currentProfit) => cumulatedUntilNow + currentProfit);

        return {
            cumulatedNetProfitsIfUsingDiv30Ruling: cumulatedProfit,
            currentYear: year.currentYear,
            netProfitIfUsingDiv30Ruling: year.netProfitIfUsingDiv30Ruling,
            moneyLeftZZP: year.moneyLeftZZP,
            moneyLeftDiv30Ruling: year.moneyLeftDiv30Ruling
        };
    }

}