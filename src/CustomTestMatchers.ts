type AcceptableRange = { start: number; end: number; };

type CustomMatchers = {
  almostEqualMatchers: jest.ExpectExtendMap;
};

export let customMatchers: CustomMatchers;
customMatchers = {

  almostEqualMatchers: {
    /**
     * Assert if result is approximately correct.
     * TODO: Fix that . . . it' weird how it's done.
     *       But it works for now.
     *       -> The original parameter should be:
     *            toBeAlmostEqual(RECEIVED, EXPECTED);
     *          But that's just weird
     */
    toBeAlmostEqual(expected: number, received: number) {
      // +/- the range in percent will be considered ok;
      const acceptableRangePercent = 1.5;

      const margin = expected * acceptableRangePercent / 100;
      const acceptableRange = {
        start: (expected - margin),
        end: (expected + margin)
      };

      const pass = inRange(received, acceptableRange);

      const message = () => {
        const expFormatted = this.utils.printExpected(received);
        const recFormatted = this.utils.printReceived(expected);
        const percentFomated = this.utils.printExpected(acceptableRangePercent + '%');
        return `Expected: ${recFormatted} to be almost equal to: ${expFormatted}\n` 
        + `Precision: ${percentFomated}`;
      };

      if (pass) {
        return {
          message: message,
          pass: true,
        };
      } else {
        return {
          message: message,
          pass: false,
        };
      }

      function inRange(val: number, range: AcceptableRange) {
        return (val >= range.start) && (val <= range.end);
      }

    }
  }
};