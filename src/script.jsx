"use strict";

// ----- CLASS COMPONENT -----
class Clock extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE -----
    this.state = {
      times: this.props.initialTimes,
    };

    // ----- BINDING METHODS -----
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (category, change) => {
    let newTimes = Object.assign({}, this.state.times);

    if (change === "increment" && newTimes[category] < 60)
      newTimes[category] = this.state.times[category] + 1;
    if (change === "decrement" && newTimes[category] > 1)
      newTimes[category] = this.state.times[category] - 1;
    if (change === "reset")
      newTimes[category] = this.props.initialTimes[category];

    this.setState({ times: newTimes });
  };

  // ----- RENDER -----
  render() {
    return (
      <div id="clock-app">
        <Timer category="session" />
        <div id="settings">
          <Setup
            category="session"
            time={this.state.times["session"]}
            onChange={this.handleChange}
          />
          <Setup
            category="break"
            time={this.state.times["break"]}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const Timer = (props) => {
  return (
    <div className="block" id="timer">
      <h4 className="block-label" id="timer-label">
        {props.category}
      </h4>
      <p className="block-display" id="time-left">
        25:00
      </p>
      <button type="button" className="btn-start-stop" id="start_stop">
        <i className="fas fa-play"></i>
        {/* <i className="fas fa-pause"></i> */}
      </button>
      <button type="button" className="btn-reset" id="reset">
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );
};

// setup
const Setup = (props) => {
  const setupId = props.category + "-setup";
  const labelId = props.category + "-label";
  const label = props.category + " length";
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
    <div className="block setup-block" id={setupId}>
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
