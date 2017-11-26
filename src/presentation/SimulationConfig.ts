export type ValueConfig = {
    min: number;
    max: number;
    default: number;
};
export type Config = {
    hourlyRate: ValueConfig;
    hoursPerDay: ValueConfig;
    daysPerMonth: ValueConfig;
    monthsPerYear: ValueConfig;
};
export const CONFIG: Config = {
    hourlyRate: {
        min: 20,
        max: 80,
        default: 30
    },
    hoursPerDay: {
        min: 2,
        max: 10,
        default: 6
    },
    daysPerMonth: {
        min: 5,
        max: 25,
        default: 10
    },
    monthsPerYear: {
        min: 2,
        max: 12,
        default: 6
    }
};