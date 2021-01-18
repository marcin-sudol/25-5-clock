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

      <div className="buttons">
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
    </div>
  );
};
