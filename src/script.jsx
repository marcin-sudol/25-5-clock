




// ----- CLASS COMPONENT -----
class Clock extends React.Component {
    constructor(props) {
        super(props);

        // ----- STATE FOR STATEFUL COMPONENT -----
        this.state = {
            session: 25,
            break: 5
        };

        // ----- BINDING METHODS -----
        // this.handleChange = this.handleChange.bind(this);
    }

    // ----- RENDER -----
    render() {
        return (
            <div id="clock-app">
                <Timer name="session" />
                <div id="settings">
                    <Setup name="session" value={25} />
                    <Setup name="setup" value={5} />
                </div>
            </div>
        );
    }
};



const Timer = (props) => {
    return (
        <div className="block"
            id="timer">
            <h4 className="block-label"
                id="timer-label">
                {props.name}
            </h4>
            <p className="block-display"
                id="time-left">
                25:00
            </p>
            <button type="button"
                id="start_stop">
                <i className="fas fa-play"></i>
                {/* <i className="fas fa-pause"></i> */}
            </button>
            <button type="button"
                id="reset">
                <i className="fas fa-undo-alt"></i>
            </button>
        </div>
    );
}



// setup
const Setup = (props) => {

    const setupId = props.name + "-setup";
    const labelId = props.name + "-label";
    const label = props.name + " Length";
    const displayId = props.name + "-length";
    const btnIncId = props.name + "-increment";
    const btnDecId = props.name + "-decrement";
    const btnResetId = props.name + "-reset";

    return (
        <div className="block setup-block"
            id={setupId}>

            <h4 className="block-label setup-label"
                id={labelId}>
                {label}
            </h4>

            <p className="block-display setup-display"
                id={displayId}>
                {props.value}
            </p>

            <button type="button"
                className="btn-increment"
                id={btnIncId}>
                <i className="fas fa-chevron-up"></i>
            </button>

            <button type="button"
                className="btn-decrement"
                id={btnDecId}>
                <i className="fas fa-chevron-down"></i>
            </button>

            <button type="button"
                className="btn-reset"
                id={btnResetId}>
                <i className="fas fa-undo-alt"></i>
            </button>

        </div>
    );
};



// ----- RENDER COMPONENT -----
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

