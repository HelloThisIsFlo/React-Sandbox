import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import PlotlyChart from 'react-plotlyjs-ts';
export interface SandboxProps {
}
export interface SandboxState {
    val: number;
}
class Sandbox extends React.Component<SandboxProps, SandboxState> {

    data: Array<{}>;
    layout: {};

    componentDidMount() {
        if (this.state.val < 20) {
            // setInterval(
            //     () => this.setState({val: this.state.val + 0.1}), 
            //     10
            // );
        }
    }

    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            val: 0
        };

        this.handleSlider = this.handleSlider.bind(this);
        this.resetValue = this.resetValue.bind(this);
    }

    refreshPlotData() {
        const trace1 = {
            x: [1999, 2000, 2001, 2002],
            y: [10, 15, 13, 17],
            type: 'scatter'
        };
        const trace2 = {
            x: [1999, 2000, 2001, 2002],
            y: [16, this.state.val, 11, 9],
            type: 'scatter'
        };
        this.data = [trace1, trace2];

        this.layout = {
            title: 'Sales Growth',
            xaxis: {
                title: 'Year',
                showgrid: false,
                zeroline: false
            },
            yaxis: {
                title: 'Percent',
                showline: false
            }
        };
    }

    handleSlider(_event: {}, val: number) {
        this.setState({val: val * 20});
    }
    resetValue(_event: {}) {
        this.setState({val: 0});
    }

    render() {
        this.refreshPlotData();
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8 alert alert-success" id="mainTitle">
                        <Hello name="Test" enthusiasmLevel={10} />
                    </div>
                </div>
                <div className="row justify-content-center" id="plot">
                    <PlotlyChart data={this.data} layout={this.layout}/>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <Slider value={this.state.val / 20} onChange={this.handleSlider}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <RaisedButton label="Default" onClick={this.resetValue} />
                </div>
            </div>
        );
    }
}

export default Sandbox;