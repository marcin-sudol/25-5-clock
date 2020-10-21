"use strict";

// ----- CLASS COMPONENT -----

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
  _inherits(Clock, _React$Component);

  function Clock(props) {
    _classCallCheck(this, Clock);

    // ----- STATE -----
    var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

    _this.handleSetupInput = function (category, change) {
      if (!_this.state.running) {
        var newTimes = Object.assign({}, _this.state.times);
        if (change === "increment" && _this.state.times[category] < 60) newTimes[category] = _this.state.times[category] + 1;else if (change === "decrement" && _this.state.times[category] > 1) newTimes[category] = _this.state.times[category] - 1;

        _this.setState({
          times: newTimes
        }, function () {
          _this.switchClockToCategory("session");
        });
      }
    };

    _this.handleTimerInput = function (change) {
      if (change === "start-stop") {
        _this.toggleClock();
      } else if (change === "reset") {
        _this.resetClock();
      }
    };

    _this.startClock = function () {
      _this.setState({
        running: true,
        paused: false,
        timerId: window.setInterval(_this.clockStep, 1000)
      });
    };

    _this.pauseClock = function () {
      window.clearInterval(_this.state.timerId);
      _this.setState({
        running: true,
        paused: true
      });
    };

    _this.stopClock = function () {
      window.clearInterval(_this.state.timerId);
      _this.setState({
        running: false,
        paused: false
      });
    };

    _this.toggleClock = function () {
      if (!_this.state.running || _this.state.paused) {
        _this.startClock();
      } else {
        _this.pauseClock();
      }
    };

    _this.resetClock = function () {
      _this.pauseAudio();
      _this.setState({
        times: Object.assign({}, _this.props.defaultTimes),
        category: "session",
        clock: {
          minutes: _this.props.defaultTimes["session"],
          seconds: 0
        }
      }, _this.stopClock);
    };

    _this.switchClockToCategory = function (category) {
      _this.setState(function (state) {
        return {
          category: category,
          clock: {
            minutes: state.times[category],
            seconds: 0
          }
        };
      });
    };

    _this.switchCategory = function () {
      if (_this.state.category === "session") {
        _this.switchClockToCategory("break");
      } else {
        _this.switchClockToCategory("session");
      }
    };

    _this.clockStep = function () {
      if (_this.state.clock.minutes === 0 && _this.state.clock.seconds === 0) {
        _this.playAudio();
        _this.switchCategory();
      } else if (_this.state.clock.seconds > 0) _this.setState(function (state) {
        return {
          clock: {
            minutes: state.clock.minutes,
            seconds: state.clock.seconds - 1
          }
        };
      });else _this.setState(function (state) {
        return {
          clock: {
            minutes: state.clock.minutes - 1,
            seconds: 59
          }
        };
      });
    };

    _this.playAudio = function () {
      var audio = document.getElementById("beep");
      audio.currentTime = 0;
      audio.play();
    };

    _this.pauseAudio = function () {
      var audio = document.getElementById("beep");
      audio.pause();
      // audio.currentTime = 0;
    };

    _this.state = {
      times: _this.props.defaultTimes,
      category: "session",
      clock: {
        minutes: _this.props.defaultTimes["session"],
        seconds: 0
      },
      running: false,
      paused: false,
      timerId: 0
    };

    // ----- BINDING METHODS -----
    _this.handleSetupInput = _this.handleSetupInput.bind(_this);
    _this.handleTimerInput = _this.handleTimerInput.bind(_this);
    _this.startClock = _this.startClock.bind(_this);
    _this.pauseClock = _this.pauseClock.bind(_this);
    _this.stopClock = _this.stopClock.bind(_this);
    _this.toggleClock = _this.toggleClock.bind(_this);
    _this.resetClock = _this.resetClock.bind(_this);
    _this.switchClockToCategory = _this.switchClockToCategory.bind(_this);
    _this.switchCategory = _this.switchCategory.bind(_this);
    _this.clockStep = _this.clockStep.bind(_this);
    _this.playAudio = _this.playAudio.bind(_this);
    _this.pauseAudio = _this.pauseAudio.bind(_this);
    return _this;
  }

  _createClass(Clock, [{
    key: "render",


    // ----- RENDER -----
    value: function render() {
      return React.createElement(
        "div",
        { id: "clock-app" },
        React.createElement(Timer, {
          category: this.state.category,
          clock: this.state.clock,
          paused: this.state.paused,
          onChange: this.handleTimerInput
        }),
        React.createElement(
          "div",
          { id: "settings" },
          React.createElement(Setup, {
            category: "session",
            time: this.state.times["session"],
            onChange: this.handleSetupInput
          }),
          React.createElement(Setup, {
            category: "break",
            time: this.state.times["break"],
            onChange: this.handleSetupInput
          })
        ),
        React.createElement("audio", { id: "beep", src: this.props.audioSrc })
      );
    }
  }]);

  return Clock;
}(React.Component);

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

// setup
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

// ----- RENDER COMPONENT -----
ReactDOM.render(React.createElement(Clock, {
  defaultTimes: { session: 25, break: 5 },
  audioSrc: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
}), document.getElementById("root"));