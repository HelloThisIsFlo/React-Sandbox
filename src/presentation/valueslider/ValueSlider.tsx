import * as React from 'react';

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

    constructor(props: ValueSliderProps) {
        super(props);

        this.state = {
            mainCaption: props.mainCaption,
            valueCaption: props.valueCaption ? props.valueCaption : '',
            value: props.start ? props.start : DEFAULT_START,
            start: props.start ? props.start : DEFAULT_START,
            end: props.end ? props.end : DEFAULT_END
        };

        this.handleNewValue = this.handleNewValue.bind(this);
    }

    handleNewValue(_e: {}, newVal: number) {
        return;
    }

    render() {
        return (
            <div className="value-slider">
                <div>
                    text
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

}