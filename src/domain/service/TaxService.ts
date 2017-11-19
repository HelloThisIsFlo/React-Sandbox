import TaxCalculator from './TaxCalculator';

export interface YearDataIncome {
    moneyMade: number;
}
export interface YearDataResult {
    netOnAccount: number;
}
export interface TaxService {
    simulation8Years(moneyMadeEachYeah: YearDataIncome[]): YearDataResult[];
}

/**
 * Utility function to create a YearDataIncome DTO
 * @param hourlyRate Ut
 * @param hoursBilled 
 */
export function fromHourlyRate(hourlyRate: number, hoursBilled: number): YearDataIncome {
    return { moneyMade: hourlyRate * hoursBilled };
}

export class TaxServiceImpl implements TaxService {

    calculator: TaxCalculator;

    constructor(calculator: TaxCalculator) {
        this.calculator = calculator;
    }

    public simulation8Years(moneyMadeEachYeah: YearDataIncome[]): YearDataResult[] {
        throw new Error('Not implemented yet.');
    }

}