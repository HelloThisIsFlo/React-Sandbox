/**
 * Define all the styles that are in-lined
 * For regular CSS styles, see the corresponding CSS file
 * 
 */
export type YearDataStyle = {
    root: React.CSSProperties;
};
export const style: YearDataStyle = {
    root: {
        width: 150,
        margin: 5,
        display: 'flex',
        justifyContent: 'space-around'
    }
};

/**
 * Define the text resources to be used.
 */
export type ValueCaption = {
    mainCaption: string;
    valueCaption: string;
};
export type YearDataCaptions = {
    hourlyRate: ValueCaption;
    hoursPerDay: ValueCaption;
    daysPerMonth: ValueCaption;
    monthsPerYear: ValueCaption;
};
const euroSign: string = String.fromCharCode(8364);
export const captions: YearDataCaptions = {
    hourlyRate: {
        mainCaption: 'h. rate',
        valueCaption: euroSign + ' / hour'
    },
    hoursPerDay: {
        mainCaption: 'h. day',
        valueCaption: 'h / day'
    },
    daysPerMonth: {
        mainCaption: 'd. month',
        valueCaption: 'd / month'
    },
    monthsPerYear: {
        mainCaption: 'months',
        valueCaption: 'm worked'
    }
};
