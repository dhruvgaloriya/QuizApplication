import React, { Component } from "react";

export default class Timer extends Component {
  state = {
    seconds: "00",
    value: "01"
  };
  //i used static timing but we can use dynamic timing also
  tick = () => {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;

    this.setState({
      value: min,
      seconds: sec
    });

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      });
    }

    if (min < 10) {
      this.setState({
        value: "0" + min
      });
    }

    if ((min === 0) & (sec === 0)) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining--;
  };

  componentDidMount() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
  }

  handleRestart = () => {
    window.location.reload();
  };

  render() {
    const { seconds, value } = this.state;
    if (this.props.isClicked) {
      return (
        <center>
          {seconds === "00" && value === "00" ? (
            <div className="popup-container" style={{ display: "flex" }}>
              <div className="container">
                <div className="col-md-8 col-md-offset-2">
                  <div className="popup">
                    <h1>Time Up! The Quiz Is Finished</h1>
                    <p>
                      Your Total Score is {this.props.score} out of{" "}
                      {this.props.total} questions Right
                    </p>
                    <button className="fancy-btn" onClick={this.handleRestart}>
                      Restart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1 style={{ fontSize: 70, marginTop: 0 }}>
              {this.state.value}:{this.state.seconds}
            </h1>
          )}
        </center>
      );
    } else {
      return (
        <center>
          {" "}
          <h1 style={{ fontSize: 70, marginTop: 0 }}>None</h1>
        </center>
      );
    }
  }
}
