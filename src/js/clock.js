class Clock extends React.Component {
  constructor(props) {
    super(props);

    // ----- STATE -----
    this.state = {
      times: this.props.defaultTimes,
      category: "session",
      clock: {
        minutes: this.props.defaultTimes["session"],
        seconds: 0,
      },
      running: false,
      paused: false,
      timerId: 0,
    };

    // ----- BINDING METHODS -----
    this.handleSetupInput = this.handleSetupInput.bind(this);
    this.handleTimerInput = this.handleTimerInput.bind(this);
    this.startClock = this.startClock.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.switchClockToCategory = this.switchClockToCategory.bind(this);
    this.switchCategory = this.switchCategory.bind(this);
    this.clockStep = this.clockStep.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
  }

  handleSetupInput = (category, change) => {
    if (!this.state.running) {
      const newTimes = Object.assign({}, this.state.times);
      if (change === "increment" && this.state.times[category] < 60)
        newTimes[category] = this.state.times[category] + 1;
      else if (change === "decrement" && this.state.times[category] > 1)
        newTimes[category] = this.state.times[category] - 1;

      this.setState(
        {
          times: newTimes,
        },
        () => {
          this.switchClockToCategory("session");
        }
      );
    }
  };

  handleTimerInput = (change) => {
    if (change === "start-stop") {
      this.toggleClock();
    } else if (change === "reset") {
      this.resetClock();
    }
  };

  startClock = () => {
    this.setState({
      running: true,
      paused: false,
      timerId: window.setInterval(this.clockStep, 1000),
    });
  };

  pauseClock = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      running: true,
      paused: true,
    });
  };

  stopClock = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      running: false,
      paused: false,
    });
  };

  toggleClock = () => {
    if (!this.state.running || this.state.paused) {
      this.startClock();
    } else {
      this.pauseClock();
    }
  };

  resetClock = () => {
    this.pauseAudio();
    this.setState(
      {
        times: Object.assign({}, this.props.defaultTimes),
        category: "session",
        clock: {
          minutes: this.props.defaultTimes["session"],
          seconds: 0,
        },
      },
      this.stopClock
    );
  };

  switchClockToCategory = (category) => {
    this.setState((state) => ({
      category,
      clock: {
        minutes: state.times[category],
        seconds: 0,
      },
    }));
  };

  switchCategory = () => {
    if (this.state.category === "session") {
      this.switchClockToCategory("break");
    } else {
      this.switchClockToCategory("session");
    }
  };

  clockStep = () => {
    if (this.state.clock.minutes === 0 && this.state.clock.seconds === 0) {
      this.playAudio();
      this.switchCategory();
    } else if (this.state.clock.seconds > 0)
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

  playAudio = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  };

  pauseAudio = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    // audio.currentTime = 0;
  };

  // ----- RENDER -----
  render() {
    return (
      <div id="clock-app">
        <Timer
          category={this.state.category}
          clock={this.state.clock}
          paused={this.state.paused}
          onChange={this.handleTimerInput}
        />
        <div id="settings">
          <Setup
            category="session"
            time={this.state.times["session"]}
            onChange={this.handleSetupInput}
          />
          <Setup
            category="break"
            time={this.state.times["break"]}
            onChange={this.handleSetupInput}
          />
        </div>
        <audio id="beep" src={this.props.audioSrc} />
      </div>
    );
  }
}
