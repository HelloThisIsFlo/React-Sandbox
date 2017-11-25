import * as React from 'react';
import './ValueSliderStyle.css';
import { style, ValueSliderStyle } from './ValueSliderStyle';
import Slider from 'material-ui/Slider';
import * as update from 'immutability-helper';
import NumberInput from './NumberInput';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

export type ValueSliderProps = {
    onNewValue?: (newVal: number) => void;
    mainCaption: String;
    valueCaption?: String;
    min?: number;
    max?: number;
    value?: number;
};
export interface ValueSliderState extends ValueSliderProps {
    onNewValue: (newVal: number) => void;
    valueCaption: String;
    min: number;
    max: number;
    value: number;
    nonSanitizedValue: number;
}

export default class ValueSlider extends React.Component<ValueSliderProps, ValueSliderState> {

    constructor(props: ValueSliderProps) {
        super(props);

        function initValueFromProps() {
            if (props.value) { return props.value; }
            if (props.min) { return props.min; }
            return DEFAULT_MIN;
        }

        const doNothing = (val: number) => { return; };
        this.state = {
            onNewValue: props.onNewValue ? props.onNewValue : doNothing,
            mainCaption: props.mainCaption,
            valueCaption: props.valueCaption ? props.valueCaption : '',
            value: initValueFromProps(),
            nonSanitizedValue: initValueFromProps(),
            min: props.min ? props.min : DEFAULT_MIN,
            max: props.max ? props.max : DEFAULT_MAX
        };

        this.handleNewValueFromSlider = this.handleNewValueFromSlider.bind(this);
        this.sanitizeAndSetValue = this.sanitizeAndSetValue.bind(this);
    }

    componentWillReceiveProps(newProps: ValueSliderProps) {
        if (newProps.value) {
            this.sanitizeAndSetValue(newProps.value);
        }
    }

    componentDidUpdate(prevProps: ValueSliderProps, prevState: ValueSliderState) {
        const callCallback = () => this.state.onNewValue(this.state.value);

        const newValueAvailable = prevState.value !== this.state.value;
        const triedToUpdateButFailed =
            prevState.nonSanitizedValue !== this.state.nonSanitizedValue
            && (prevState.value === this.state.value);

        if (newValueAvailable || triedToUpdateButFailed) {
            callCallback();
        }
    }

    handleNewValueFromSlider(_e: {}, newVal: number) {
        this.sanitizeAndSetValue(newVal);
    }
    handleNewValueFromNumberInput(newVal: number) {
        this.sanitizeAndSetValue(newVal);
    }

    sanitizeAndSetValue(nonSanitized: number) {
        let newVal = nonSanitized;
        newVal = newVal > this.state.max ? this.state.max : newVal;
        newVal = newVal < this.state.min ? this.state.min : newVal;
        newVal = Math.round(newVal);

        const newState: ValueSliderState = update(this.state, {
            value: { $set: newVal },
            nonSanitizedValue: { $set: nonSanitized },
        });
        this.setState(newState);
    }

    render() {
        const mainCaptionOneCharPerLine = this.state.mainCaption
            .split('')
            .map((char, index) =>
                <p key={index}>{char}</p>
            );

        return (
            <div className="value-slider">
                <div className="main-caption" >
                    <div>{mainCaptionOneCharPerLine}</div>
                </div>
                <div className="value">
                    <NumberInput
                        value={this.state.value}
                        onNewValue={this.sanitizeAndSetValue}
                    />
                </div>
                <div className="value-caption" >
                    <p>{this.state.valueCaption}</p>
                </div>
                <div className="slider" >
                    <Slider
                        style={style.slider.root}
                        sliderStyle={style.slider.slider}
                        axis="y"
                        min={this.state.min}
                        max={this.state.max}
                        value={this.state.value}
                        onChange={this.handleNewValueFromSlider}
                    />
                </div>
            </div>
        );
    }

}