import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';
// import * as Bootstrap from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

export default Sandbox;

// Bootstrap.CarouselItem().alert.

const sandboxPage = (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-8 alert alert-success" id="mainTitle">
                <Hello name="Test" enthusiasmLevel={10} />
            </div>
        </div>
        <div className="row justify-content-center">
            <RaisedButton label="Default" />
        </div>
        <div className="row justify-content-center">
            <div itemType="button" className="btn btn-lg btn-primary" id="mainButton">
                Button
            </div>
        </div>
    </div>
);

function Sandbox() {
    return sandboxPage;
}