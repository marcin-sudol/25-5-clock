var Setup = function Setup(props) {
  var setupId = props.category + "-setup";
  var labelId = props.category + "-label";
  var label = "Set " + props.category.toUpperCase() + " length";
  var displayId = props.category + "-length";
  var btnIncId = props.category + "-increment";
  var btnDecId = props.category + "-decrement";

  var increment = function increment() {
    props.onChange(props.category, "increment");
  };

  var decrement = function decrement() {
    props.onChange(props.category, "decrement");
  };

  return React.createElement(
    "div",
    {
      className: "block setup-block " + props.category + "-colors",
      id: setupId
    },
    React.createElement(
      "h4",
      { className: "block-label setup-label", id: labelId },
      label
    ),
    React.createElement(
      "p",
      { className: "block-display setup-display", id: displayId },
      props.time
    ),
    React.createElement(
      "div",
      { className: "buttons" },
      React.createElement(
        "button",
        {
          type: "button",
          className: "btn-increment",
          id: btnIncId,
          onClick: increment
        },
        React.createElement("i", { className: "fas fa-chevron-up" })
      ),
      React.createElement(
        "button",
        {
          type: "button",
          className: "btn-decrement",
          id: btnDecId,
          onClick: decrement
        },
        React.createElement("i", { className: "fas fa-chevron-down" })
      )
    )
  );
};