"use strict";

// ----- CLASS COMPONENT -----
class Clock extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE -----
    this.state = {
      setupTimes: this.props.defaultTimes,
      currentTimes: this.props.defaultTimes,
      category: "session",
      clock: {
        minutes: this.props.defaultTimes["session"],
        seconds: 0,
      },
      running: false,
      timerId: 0,
    };

    // ----- BINDING METHODS -----
    this.handleSetupInput = this.handleSetupInput.bind(this);
    this.handleTimerInput = this.handleTimerInput.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.setCurrentToSetup = this.setCurrentToSetup.bind(this);
    this.setTimesToDefault = this.setTimesToDefault.bind(this);
    this.switchCategory = this.switchCategory.bind(this);
    this.clockStep = this.clockStep.bind(this);
  }

  handleSetupInput = (category, change) => {
    const newSetupTimes = Object.assign({}, this.state.setupTimes);
    if (change === "increment" && this.state.setupTimes[category] < 60)
      newSetupTimes[category] = this.state.setupTimes[category] + 1;
    else if (change === "decrement" && this.state.setupTimes[category] > 1)
      newSetupTimes[category] = this.state.setupTimes[category] - 1;

    if (this.state.running) {
      this.setState({
        setupTimes: newSetupTimes,
      });
    } else {
      this.setState(
        {
          setupTimes: newSetupTimes,
        },
        this.setCurrentToSetup
      );
    }
  };

  handleTimerInput = (change) => {
    if (change === "start-stop") this.toggleClock();
    else if (change === "reset") {
      this.stopClock();
      this.setTimesToDefault();
    }
  };

  startClock = () => {
    this.setState({
      running: true,
      timerId: window.setInterval(this.clockStep, 1000),
    });
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
    this.setState((state) => ({
      category,
      clock: {
        minutes: state.currentTimes[category],
        seconds: 0,
      },
    }));
  };

  setCurrentToSetup = () => {
    this.setState((state) => {
      const newCurrentTimes = Object.assign({}, state.setupTimes);
      return {
        currentTimes: newCurrentTimes,
        category: "session",
        clock: {
          minutes: newCurrentTimes["session"],
          seconds: 0,
        },
      };
    });
  };

  setTimesToDefault = () => {
    this.setState((state) => {
      const newSetupTimes = Object.assign({}, this.props.defaultTimes);
      const newCurrentTimes = Object.assign({}, this.props.defaultTimes);
      return {
        setupTimes: newSetupTimes,
        currentTimes: newCurrentTimes,
        category: "session",
        clock: {
          minutes: newCurrentTimes["session"],
          seconds: 0,
        },
      };
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
    if (this.state.clock.minutes === 0 && this.state.clock.seconds === 0)
      this.switchCategory();
    else if (this.state.clock.seconds > 0)
      this.setState((state) => ({
        clock: {
          minutes: state.clock.minutes,
          seconds: state.clock.seconds - 1,
        },
      }));
    else
      this.setState((state) => ({
        clock: {
          minutes: state.clock.minutes - 1,
          seconds: 59,
        },
      }));
  };

  // ----- RENDER -----
  render() {
    return (
      <div id="clock-app">
        <Timer
          category={this.state.category}
          currentTimes={this.state.currentTimes}
          clock={this.state.clock}
          onChange={this.handleTimerInput}
        />
        <div id="settings">
          <Setup
            category="session"
            time={this.state.setupTimes["session"]}
            onChange={this.handleSetupInput}
          />
          <Setup
            category="break"
            time={this.state.setupTimes["break"]}
            onChange={this.handleSetupInput}
          />
        </div>
      </div>
    );
  }
}

const Timer = (props) => {
  const header =
    "Session: " +
    props.currentTimes["session"] +
    " + Break: " +
    props.currentTimes["break"];

  const display =
    (props.clock.minutes < 10
      ? "0" + props.clock.minutes
      : props.clock.minutes) +
    ":" +
    (props.clock.seconds < 10
      ? "0" + props.clock.seconds
      : props.clock.seconds);

  const startStop = () => {
    props.onChange("start-stop");
  };
  const reset = () => {
    props.onChange("reset");
  };

  return (
    <div className={"block " + props.category + "-colors"} id="timer">
      <header id="timer-header">
        <h1>{header}</h1>
      </header>
      <h4 className="block-label" id="timer-label">
        {props.category}
      </h4>
      <p className="block-display" id="time-left">
        {display}
      </p>
      <button
        type="button"
        className="btn-start-stop"
        id="start_stop"
        onClick={startStop}
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

  const increment = () => {
    props.onChange(props.category, "increment");
  };

  const decrement = () => {
    props.onChange(props.category, "decrement");
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
    </div>
  );
};

// ----- RENDER COMPONENT -----
ReactDOM.render(
  <Clock defaultTimes={{ session: 25, break: 5 }} />,
  document.getElementById("root")
);
