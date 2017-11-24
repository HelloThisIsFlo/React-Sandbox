import * as React from 'react';
import './ValueSlider.css';
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
};
export interface ValueSliderState extends ValueSliderProps {
    onNewValue: (newVal: number) => void;
    valueCaption: String;
    min: number;
    max: number;
    value: number;
}

export default class ValueSlider extends React.Component<ValueSliderProps, ValueSliderState> {

    private rootSliderStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: ('column' as 'column'),
        alignItems: ('center' as 'center'),
        justifyContent: ('center' as 'center'),
    };
    private sliderSliderStyle = {
        marginTop: 10,
        marginBottom: 10
    };

    constructor(props: ValueSliderProps) {
        super(props);

        const doNothing = (val: number) => { return; };
        this.state = {
            onNewValue: props.onNewValue ? props.onNewValue : doNothing,
            mainCaption: props.mainCaption,
            valueCaption: props.valueCaption ? props.valueCaption : '',
            value: props.min ? props.min : DEFAULT_MIN,
            min: props.min ? props.min : DEFAULT_MIN,
            max: props.max ? props.max : DEFAULT_MAX
        };

        this.handleNewValueFromSlider = this.handleNewValueFromSlider.bind(this);
        this.setStateAndCallCallback = this.setStateAndCallCallback.bind(this);
    }

    handleNewValueFromSlider(_e: {}, newVal: number) {
        this.setStateAndCallCallback(Math.round(newVal));
    }

    setStateAndCallCallback(newVal: number) {
        newVal = newVal > this.state.max ? this.state.max : newVal;
        newVal = newVal < this.state.min ? this.state.min : newVal;
        const newState: ValueSliderState = update(this.state, {
            value: { $set: newVal }
        });
        this.setState(newState);

        this.state.onNewValue(newVal);
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
                        onNewValue={this.setStateAndCallCallback}
                    />
                </div>
                <div className="value-caption" >
                    <p>{this.state.valueCaption}</p>
                </div>
                <div className="slider" >
                    <Slider
                        style={this.rootSliderStyle}
                        sliderStyle={this.sliderSliderStyle}
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