import * as React from 'react';
import './ValueSlider.css';
import Slider from 'material-ui/Slider';
import * as update from 'immutability-helper';
import NumberInput from './NumberInput';

const DEFAULT_START = 0;
const DEFAULT_END = 100;

export type ValueSliderProps = {
    mainCaption: String;
    valueCaption?: String;
    start?: number;
    end?: number;
};
export interface ValueSliderState extends ValueSliderProps {
    valueCaption: String;
    start: number;
    end: number;
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

        this.state = {
            mainCaption: props.mainCaption,
            valueCaption: props.valueCaption ? props.valueCaption : '',
            value: props.start ? props.start : DEFAULT_START,
            start: props.start ? props.start : DEFAULT_START,
            end: props.end ? props.end : DEFAULT_END
        };

        this.handleNewValueFromSlider = this.handleNewValueFromSlider.bind(this);
        this.setStateWithNewValue = this.setStateWithNewValue.bind(this);
    }

    handleNewValueFromSlider(_e: {}, newVal: number) {
        this.setStateWithNewValue(Math.round(newVal));
    }

    setStateWithNewValue(newVal: number) {
        newVal = newVal > this.state.end ? this.state.end : newVal;
        newVal = newVal < this.state.start ? this.state.start : newVal;
        const newState: ValueSliderState = update(this.state, {
            value: { $set: newVal }
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
                        onNewValue={this.setStateWithNewValue}
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
                        min={this.state.start}
                        max={this.state.end}
                        value={this.state.value}
                        onChange={this.handleNewValueFromSlider}
                    />
                </div>
            </div>
        );
    }

}