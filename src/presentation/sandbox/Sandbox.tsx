import * as React from 'react';
import './Sandbox.css';
import Hello from '../helloworld/Hello';

export default Sandbox;

const sandboxPage = (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-8 alert alert-success" id="mainTitle">
                <Hello name="Test" enthusiasmLevel={10} />
            </div>
        </div>
        <div className="row justify-content-center">
            <div itemType="button" className="btn btn-lg btn-primary">
                Button
            </div>
        </div>
    </div>
);

function Sandbox() {
    return sandboxPage;
}