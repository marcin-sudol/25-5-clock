// ----- CLASS COMPONENT -----
class Clock extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE -----
    this.state = {
      session: this.props.initSession,
      break: this.props.initBreak,
    };

    // ----- BINDING METHODS -----
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name, change) => {
    if (name === "session" && change === "increment")
      this.setState((state) => ({
        session: state.session < 60 ? state.session + 1 : state.session,
      }));

    if (name === "session" && change === "decrement")
      this.setState((state) => ({
        session: state.session > 1 ? state.session - 1 : state.session,
      }));

    if (name === "session" && change === "reset")
      this.setState({ session: this.props.initSession });

    if (name === "break" && change === "increment")
      this.setState((state) => ({
        break: state.break < 60 ? state.break + 1 : state.break,
      }));

    if (name === "break" && change === "decrement")
      this.setState((state) => ({
        break: state.break > 1 ? state.break - 1 : state.break,
      }));

    if (name === "break" && change === "reset")
      this.setState({ break: this.props.initBreak });
  };

  // ----- RENDER -----
  render() {
    return (
      <div id="clock-app">
        <Timer name="session" />
        <div id="settings">
          <Setup
            name="session"
            value={this.state.session}
            onChange={this.handleChange}
          />
          <Setup
            name="break"
            value={this.state.break}
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
        {props.name}
      </h4>
      <p className="block-display" id="time-left">
        25:00
      </p>
      <button type="button" id="start_stop">
        <i className="fas fa-play"></i>
        {/* <i className="fas fa-pause"></i> */}
      </button>
      <button type="button" id="reset">
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );
};

// setup
const Setup = (props) => {
  const setupId = props.name + "-setup";
  const labelId = props.name + "-label";
  const label = props.name + " length";
  const displayId = props.name + "-length";
  const btnIncId = props.name + "-increment";
  const btnDecId = props.name + "-decrement";
  const btnResetId = props.name + "-reset";

  const increment = () => {
    props.onChange(props.name, "increment");
  };

  const decrement = () => {
    props.onChange(props.name, "decrement");
  };

  const reset = () => {
    props.onChange(props.name, "reset");
  };

  return (
    <div className="block setup-block" id={setupId}>
      <h4 className="block-label setup-label" id={labelId}>
        {label}
      </h4>

      <p className="block-display setup-display" id={displayId}>
        {props.value}
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
  <Clock initSession={25} initBreak={5} />,
  document.getElementById("root")
);
