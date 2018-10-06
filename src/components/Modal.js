import React from "react";
import "../styles/Modal.css"

export const Modal = (props) => {
    return (
        <div className={props.show ? 'modal active' : 'modal'}>
            <div className="wrapper">
                <div className="popup">
                    <div className="popup-inside">
                        <div className="backgrounds">
                            <div className="background" />
                            <div className="background background2" />
                            <div className="background background3" />
                            <div className="background background4" />
                            <div className="background background5" />
                            <div className="background background6" />
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-wrapper">
                            <h1>Well done</h1>
                            <p>Did you like it?</p>
                            <p className="try-again" onClick={props.handleNewGame}>Yes! New Game!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
