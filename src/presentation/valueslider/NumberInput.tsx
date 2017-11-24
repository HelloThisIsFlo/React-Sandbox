import * as React from 'react';
import * as update from 'immutability-helper';

export type NumberInputProps = {
    onNewValue?: (newValue: number) => void;
    value?: number;
};
export interface NumberInputState extends NumberInputProps {
    onNewValue: (newValue: number) => void;
    value: number;
    innerTextValue: string;
}
export default class NumberInput extends React.Component<NumberInputProps, NumberInputState> {

    private htmlInputElement: HTMLInputElement;

    constructor(props: NumberInputProps) {
        super(props);

        const doNothing = (val: number) => { return; };
        const initValue = props.value ? props.value : 0;
        this.state = {
            value: initValue,
            innerTextValue: initValue.toString(),
            onNewValue: props.onNewValue ? props.onNewValue : doNothing
        };

        this.handleChange = this.handleChange.bind(this);
        this.onKeyBlurIfEnterKey = this.onKeyBlurIfEnterKey.bind(this);
        this.onBlurValidateAndCallCallback = this.onBlurValidateAndCallCallback.bind(this);
    }

    componentWillReceiveProps(newProps: NumberInputProps) {
        if (newProps.value) {
            this.setNewNumberValue(newProps.value);
        }
    }

    setNewNumberValue(newVal: number) {
        this.setState(update(this.state, {
            value: { $set: newVal },
            innerTextValue: {$set: newVal}
        }));
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newInnerTextValue = e.target.value;
        this.setState(update(this.state, {
            innerTextValue: { $set: newInnerTextValue }
        }));
    }

    onKeyBlurIfEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            this.htmlInputElement.blur();
        }
    }

    onBlurValidateAndCallCallback(e: React.FocusEvent<HTMLInputElement>) {
        if (isNumber(this.state.innerTextValue)) {
            const newValue = parseInt(this.state.innerTextValue, 10);
            this.setNewNumberValue(newValue);
            this.state.onNewValue(newValue);
        } else {
            this.setNewNumberValue(this.state.value);
        }

        function isNumber(val: string) { return /^\d+$/.test(val); }
    }

    render() {
        return (
            <input
                inputMode="numeric"
                ref={(input) => { if (input) { this.htmlInputElement = input; } }}
                type="text"
                value={this.state.innerTextValue}
                onChange={this.handleChange}
                onKeyPress={this.onKeyBlurIfEnterKey}
                onBlur={this.onBlurValidateAndCallCallback}
            />
        );
    }
}