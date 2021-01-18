const Timer = (props) => {
  const label =
    props.category.toUpperCase() + (props.paused ? " (paused)" : "");

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
      <h4 className="block-label" id="timer-label">
        {label}
      </h4>

      <p className="block-display" id="time-left">
        {display}
      </p>

      <div className="buttons">
        <button
          type="button"
          className="btn-start-stop"
          id="start_stop"
          onClick={startStop}
        >
          <i className="fas fa-play"></i> <i className="fas fa-pause"></i>
          {/* <i className="fas fa-pause"></i> */}
        </button>
        <button type="button" className="btn-reset" id="reset" onClick={reset}>
          <i className="fas fa-undo-alt"></i>
        </button>
      </div>
    </div>
  );
};
