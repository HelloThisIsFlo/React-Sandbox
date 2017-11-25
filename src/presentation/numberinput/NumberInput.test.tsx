import { shallow, ShallowWrapper, mount, ReactWrapper, MountRendererProps } from 'enzyme';
import * as React from 'react';
import NumberInput from './NumberInput';

/***************** Hack to simulate DOM native events *********************/
/**
 * Apparently the DOM simulated by `js-dom` doesn't trigger further 'Synthetic' events
 * Usually we wouldn't modify directly the DOM inside our component. 
 * But since we do here ... AND expect to react on that same event, we need to simulate a
 * synthetic event manually.
 * 
 * We want to: 
 * - 'blur' on 'Enter key'
 * - Validate on that 'blur'
 * The first manual 'blur' is sent ... but is not transformed in a 'Synthetic Event'
 * there fore we need to manually do that.
 * 
 * To do that, we simply need to override the definition of the 'blur' method in
 * the prototype of the `HTMLElement` and manually trigger that 'Synthetic Event'
 * 
 */
const originalBlurFunction = HTMLElement.prototype.blur;
const mockBlurToGenerateAnEventOnWrapper =
    (wrapper: ReactWrapper) => HTMLElement.prototype.blur = () => wrapper.simulate('blur');
const restoreOriginalBlur =
    () => HTMLElement.prototype.blur = originalBlurFunction;

const mountAndMockBlur = (jsx: JSX.Element): ReactWrapper => {
    const wrapper = mount(jsx);
    mockBlurToGenerateAnEventOnWrapper(wrapper);
    return wrapper;
};
/***************** Hack to simulate DOM native events *********************/

/***************** custom assert *********************/
const assert = (numInput: ReactWrapper) => {
    let displayedValue = String(numInput.find('input').props().value);
    const assertvalue = (expected: string) => expect(displayedValue).toEqual(expected);
    return { toDisplay: { value: assertvalue } };
};
/***************** custom assert *********************/

/***************** Test utility functions *********************/
const enterNewValue =
    (val: string) => numberInputWrapper.simulate('change', { target: { value: val } });
const pressEnterKey =
    () => numberInputWrapper.simulate('keypress', { key: 'Enter' });
/***************** Test utility functions *********************/

let numberInputWrapper: ReactWrapper;
let newValueListener: jest.Mock;
describe('Number Input', () => {

    beforeEach(() => numberInputWrapper && numberInputWrapper.mount());
    afterEach(() => numberInputWrapper && numberInputWrapper.unmount());
    afterAll(restoreOriginalBlur);

    describe('Defaults', () => {
        describe('No init value', () => {
            beforeEach(() => numberInputWrapper = mountAndMockBlur(<NumberInput />));
            it('Has default value: \'0\'', () =>
                assert(numberInputWrapper).toDisplay.value('0'));
            it('Has \'input\' field', () =>
                expect(numberInputWrapper.find('input').exists).toBeTruthy());
        });

        describe('With init value: \'5\'', () => {
            beforeEach(() => numberInputWrapper = mountAndMockBlur((
                <NumberInput value={5} />
            )));
            it('Displays init value: \'5\'', () =>
                assert(numberInputWrapper).toDisplay.value('5'));
            it('Has \'input\' field', () =>
                expect(numberInputWrapper.find('input').exists).toBeTruthy());
        });
    });

    describe('Scenario: Init value is \'60\'', () => {
        beforeEach(() => {
            newValueListener = jest.fn();
            numberInputWrapper = mountAndMockBlur((
                <NumberInput value={60} onNewValue={newValueListener} />
            ));
        });

        describe('Text typed is: \'17\'', () => {

            beforeEach(() => enterNewValue('17'));

            it('Displays new text', () =>
                assert(numberInputWrapper).toDisplay.value('17'));

            it('Does not yet call the callback', () =>
                expect(newValueListener.mock.calls).toHaveLength(0));

            it('Handles multiple changes without calling the callback', () => {
                enterNewValue('11');
                assert(numberInputWrapper).toDisplay.value('11');
                enterNewValue('999999');
                assert(numberInputWrapper).toDisplay.value('999999');

                expect(newValueListener.mock.calls).toHaveLength(0);
            });

            describe('Enter key is pressed', () => {
                beforeEach(pressEnterKey);
                it('Calls the callback with value \'17\'', () =>
                    expect(newValueListener.mock.calls[0][0]).toEqual(17));
            });
        });

        describe('Text typed is: \'THIS IS NOT A NUMBER !!!\'', () => {
            beforeEach(() => enterNewValue('THIS IS NOT A NUMBER !!!'));

            it('Displays the value', () =>
                assert(numberInputWrapper).toDisplay.value('THIS IS NOT A NUMBER !!!'));
            it('Does not yet call the callback', () =>
                expect(newValueListener.mock.calls).toHaveLength(0));

            describe('Enter key is pressed', () => {
                beforeEach(pressEnterKey);
                it('Still doesn\'t call callback (non valid value)', () =>
                    expect(newValueListener.mock.calls).toHaveLength(0));
                it('Displays the INIT VALUE', () =>
                    assert(numberInputWrapper).toDisplay.value('60'));
            });
        });

        describe('Typed: \'45\' THEN Key: \'Enter\' THEN Typed: \'INVALID VAL\'', () => {
            beforeEach(() => {
                // Set 45 as the latest valid value
                enterNewValue('45');
                pressEnterKey();
                newValueListener.mockClear();

                enterNewValue('INVALID VAL');
            });

            it('Displays the \'INVALID VAL\'', () =>
                assert(numberInputWrapper).toDisplay.value('INVALID VAL'));
            it('Does not yet call the callback', () =>
                expect(newValueListener.mock.calls).toHaveLength(0));

            describe('Enter key is pressed', () => {
                beforeEach(pressEnterKey);
                it('Still doesn\'t call callback (non valid value)', () =>
                    expect(newValueListener.mock.calls).toHaveLength(0));
                it('Displays the PREVIOUS VALID VALUE', () =>
                    assert(numberInputWrapper).toDisplay.value('45'));
            });
        });
    });

});