import GrossToNetDividende30Ruling from './tax_calculator/div30Ruling/GrossToNet';
import GrossToNetZzp from './tax_calculator/zzp/GrossToNet';

const zzpGtN = new GrossToNetZzp();
const div30GtN = new GrossToNetDividende30Ruling();

test.skip('Sandbox', () => {

    const grossValues = [];
    for (var i = 10000; i <= 70000; i += 2000) {
        grossValues.push(i);
    }

    const minDiv30Gross = 53000; // ~= approx
    const netForMinDiv30Gross = 43203;
    grossValues.map(gross => {
        const zzpNet = zzpGtN.calculateNetYearly(gross);
        const div30Net = div30GtN.calculateNetYearly(gross);
        const zzpTax = gross - zzpNet;
        var div30Tax: number;
        if (gross >= minDiv30Gross) {
            div30Tax = gross - div30Net;
        } else {
            div30Tax = minDiv30Gross - netForMinDiv30Gross;
        }
        const gainLossWhenUsingDiv30 = zzpTax - div30Tax;
        return {
            zzpTax: zzpTax,
            div30Tax: div30Tax,
            gainLossWhenUsingDiv30: gainLossWhenUsingDiv30,
            print: () => {
                const template = `
                -------------------------------------
                Gross: ${gross}

                Tax using ZZP:   ${zzpTax}
                Tax using DIV30: ${div30Tax}

                Gain / Loss when using DIV30
                ==> ${gainLossWhenUsingDiv30}
                -------------------------------------
                `;
                console.log(template);
            }
        };
    }).forEach(result => result.print());
    expect(2).toEqual(1);

});