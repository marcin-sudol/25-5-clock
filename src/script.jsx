




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
        this.handleChange = this.handleChange.bind(this);
    }

    // ----- RENDER -----
    render() {
        return (null
        );
    }
};





// ----- RENDER COMPONENT -----
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

