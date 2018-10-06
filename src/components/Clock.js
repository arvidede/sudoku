import React, { Component } from "react";

export class Clock extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.interval = setInterval(this.updateTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateTime = () => {
        if (this.props.isRunning) {
            const { seconds, minutes, hours } = this.state;

            this.setState({
                seconds: seconds === 59 ? 0 : seconds + 1,
                minutes:
                    seconds === 59
                        ? seconds === 59 ? 0 : minutes + 1
                        : minutes,
                hours: minutes === 59 && seconds === 59 ? hours + 1 : hours
            });
        }
    };

    render() {
        return (
            <div>
                <h1>
                    {this.state.hours > 0 && this.state.hours}
                    {this.state.hours > 0 && ":"}
                    {this.state.minutes < 10 && this.state.hours > 0 && "0"}
                    {(this.state.minutes > 0 || this.state.hours > 0) &&
                        this.state.minutes}
                    {(this.state.minutes > 0 || this.state.hours > 0) && ":"}
                    {this.state.seconds < 10 &&
                        (this.state.minutes > 0 || this.state.hours > 0) &&
                        "0"}
                    {this.state.seconds}
                </h1>
            </div>
        );
    }
}
