"use strict";

// add leading zeros

// ----- CLASS COMPONENT -----
class Clock extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE -----
    this.state = {
      times: this.props.initialTimes,
      category: "session",
      minutes: this.props.initialTimes["session"],
      seconds: 0,
      running: false,
      timerId: 0,
    };

    // ----- BINDING METHODS -----
    this.buttonPressedOnSetup = this.buttonPressedOnSetup.bind(this);
    this.buttonPressedOnTimer = this.buttonPressedOnTimer.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.switchCategory = this.switchCategory.bind(this);
    this.clockStep = this.clockStep.bind(this);
    this.display = this.display.bind(this);
  }

  buttonPressedOnSetup = (category, change) => {
    let newTimes = Object.assign({}, this.state.times);
    if (change === "increment" && newTimes[category] < 60)
      newTimes[category] = this.state.times[category] + 1;
    if (change === "decrement" && newTimes[category] > 1)
      newTimes[category] = this.state.times[category] - 1;
    if (change === "reset")
      newTimes[category] = this.props.initialTimes[category];
    this.setState({ times: newTimes }, () => {
      // update clock after set state is finished, only if clock is not running
      if (!this.state.running) this.updateClock("session");
    });
  };

  buttonPressedOnTimer = (change) => {
    if (change === "start") this.toggleClock();
    else if (change === "reset") {
      this.stopClock();
      this.updateClock("session");
    }
  };

  startClock = () => {
    this.state.timerId = window.setInterval(this.clockStep, 1000);
    this.setState({ running: true });
  };

  stopClock = () => {
    window.clearInterval(this.state.timerId);
    this.setState({ running: false });
  };

  toggleClock = () => {
    if (this.state.running) {
      this.stopClock();
    } else {
      this.startClock();
    }
  };

  updateClock = (category) => {
    this.setState({
      category,
      minutes: this.state.times[category],
      seconds: 0,
    });
  };

  switchCategory = () => {
    if (this.state.category === "session") {
      this.updateClock("break");
    } else {
      this.updateClock("session");
    }
  };

  clockStep = () => {
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      this.switchCategory();
    }
    if (this.state.seconds > 0)
      this.setState((state) => ({ seconds: state.seconds - 1 }));
    else
      this.setState((state) => ({ minutes: state.minutes - 1, seconds: 59 }));
  };

  display = () => {
    return (
      (this.state.minutes < 10
        ? "0" + this.state.minutes
        : this.state.minutes) +
      ":" +
      (this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds)
    );
  };

  // ----- RENDER -----
  render() {
    return (
      <div id="clock-app">
        <Timer
          category={this.state.category}
          display={this.display()}
          onChange={this.buttonPressedOnTimer}
        />
        <div id="settings">
          <Setup
            category="session"
            time={this.state.times["session"]}
            onChange={this.buttonPressedOnSetup}
          />
          <Setup
            category="break"
            time={this.state.times["break"]}
            onChange={this.buttonPressedOnSetup}
          />
        </div>
      </div>
    );
  }
}

const Timer = (props) => {
  const start = () => {
    props.onChange("start");
  };
  const reset = () => {
    props.onChange("reset");
  };

  return (
    <div className={"block " + props.category + "-colors"} id="timer">
      <h4 className="block-label" id="timer-label">
        {props.category}
      </h4>
      <p className="block-display" id="time-left">
        {props.display}
      </p>
      <button
        type="button"
        className="btn-start-stop"
        id="start_stop"
        onClick={start}
      >
        <i className="fas fa-play"></i>
        {/* <i className="fas fa-pause"></i> */}
      </button>
      <button type="button" className="btn-reset" id="reset" onClick={reset}>
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );
};

// setup
const Setup = (props) => {
  const setupId = props.category + "-setup";
  const labelId = props.category + "-label";
  const label = "Set " + props.category.toUpperCase() + " length";
  const displayId = props.category + "-length";
  const btnIncId = props.category + "-increment";
  const btnDecId = props.category + "-decrement";
  const btnResetId = props.category + "-reset";

  const increment = () => {
    props.onChange(props.category, "increment");
  };

  const decrement = () => {
    props.onChange(props.category, "decrement");
  };

  const reset = () => {
    props.onChange(props.category, "reset");
  };

  return (
    <div
      className={"block setup-block " + props.category + "-colors"}
      id={setupId}
    >
      <h4 className="block-label setup-label" id={labelId}>
        {label}
      </h4>

      <p className="block-display setup-display" id={displayId}>
        {props.time}
      </p>

      <button
        type="button"
        className="btn-increment"
        id={btnIncId}
        onClick={increment}
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      <button
        type="button"
        className="btn-decrement"
        id={btnDecId}
        onClick={decrement}
      >
        <i className="fas fa-chevron-down"></i>
      </button>

      <button
        type="button"
        className="btn-reset"
        id={btnResetId}
        onClick={reset}
      >
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );
};

// ----- RENDER COMPONENT -----
ReactDOM.render(
  <Clock initialTimes={{ session: 25, break: 5 }} />,
  document.getElementById("root")
);
