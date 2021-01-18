var Timer = function Timer(props) {
  var label = props.category.toUpperCase() + (props.paused ? " (paused)" : "");

  var display = (props.clock.minutes < 10 ? "0" + props.clock.minutes : props.clock.minutes) + ":" + (props.clock.seconds < 10 ? "0" + props.clock.seconds : props.clock.seconds);

  var startStop = function startStop() {
    props.onChange("start-stop");
  };
  var reset = function reset() {
    props.onChange("reset");
  };

  return React.createElement(
    "div",
    { className: "block " + props.category + "-colors", id: "timer" },
    React.createElement(
      "h4",
      { className: "block-label", id: "timer-label" },
      label
    ),
    React.createElement(
      "p",
      { className: "block-display", id: "time-left" },
      display
    ),
    React.createElement(
      "div",
      { className: "buttons" },
      React.createElement(
        "button",
        {
          type: "button",
          className: "btn-start-stop",
          id: "start_stop",
          onClick: startStop
        },
        React.createElement("i", { className: "fas fa-play" }),
        " ",
        React.createElement("i", { className: "fas fa-pause" })
      ),
      React.createElement(
        "button",
        { type: "button", className: "btn-reset", id: "reset", onClick: reset },
        React.createElement("i", { className: "fas fa-undo-alt" })
      )
    )
  );
};