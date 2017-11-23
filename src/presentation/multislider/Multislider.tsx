import * as React from 'react';
import './Multislider.css';
import Slider from 'material-ui/Slider';
import * as update from 'immutability-helper';

export interface MultisliderValues {
    value1: number;
    value2: number;
    value3: number;
}
export interface MultisliderProps {
    value?: MultisliderValues;
    onChange?(newValues: MultisliderValues): void;
}
export interface MultisliderState extends MultisliderProps, MultisliderValues {
}
/**
 * For now the Multislider really is only a Tri-Slider.
 */
class Multislider extends React.Component<MultisliderProps, MultisliderState> {

    constructor(props: MultisliderProps) {
        super(props);

        this.state = {
            value1: this.valOrZero('value1'),
            value2: this.valOrZero('value2'),
            value3: this.valOrZero('value3')
        };

        this.newValue1 = this.newValue1.bind(this);
        this.newValue2 = this.newValue2.bind(this);
        this.newValue3 = this.newValue3.bind(this);
    }

    componentWillReceiveProps(props: MultisliderProps) {
        const newValue = this.props.value;
        if (newValue !== undefined && newValue !== this.state) {
            // this.setState(newValue);
            // this.forceUpdate();
        }
        console.log(props);
        console.log(this);
    }

    valOrZero(val: string) {
        if (this.props.value === undefined) { return 0; }
        return this.props.value[val];
    }

    newValue1(_e: {}, newVal: number) {
        const newState = update(this.state, {
            value1: {$set: newVal}
        });
        this.setState(newState);
        this.valuesChanged();
    }

    newValue2(_e: {}, newVal: number) {
        const newState = update(this.state, {
            value2: {$set: newVal}
        });
        this.setState(newState);
        this.valuesChanged();
    }

    newValue3(_e: {}, newVal: number) {
        const newState = update(this.state, {
            value3: {$set: newVal}
        });
        this.setState(newState);
        this.valuesChanged();

    }

    valuesChanged() {
        if (this.props.onChange !== undefined) {
            this.props.onChange(this.state);
        }
    }

    render() {
        return (
            <div className="multislider">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Slider value={this.state.value1} onChange={this.newValue1} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Slider value={this.state.value2} onChange={this.newValue2} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Slider value={this.state.value3} onChange={this.newValue3} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Multislider;