import { Component } from "react";
import "./index.css";

const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];

class MainPage extends Component {
  state = {
    inputVal: "",
    initialValue: keys[Math.floor(Math.random() * keys.length)],
    minutes: 5,
    seconds: 0,
    inProgress: false,
    inputFieldError: false,
    questionedKeys: [],
    answeredKeys: [],
    testCompleted: false,
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  searchValChange = (event) => {
    this.setState({ inputVal: event.target.value });
  };

  verifyKey = (event) => {
    const { initialValue } = this.state;
    if (event.key !== "Backspace") {
      this.setState((prevstate) => ({
        questionedKeys: [...prevstate.questionedKeys, initialValue],
      }));
      if (initialValue === event.key) {
        this.setState((prevstate) => ({
          initialValue: keys[Math.floor(Math.random() * keys.length)],
          inputVal: "",
          inputFieldError: false,
          answeredKeys: [...prevstate.answeredKeys, initialValue],
        }));
      } else {
        this.setState({ inputFieldError: true, inputVal: "" });
      }
    }
  };

  startBtn = () => {
    this.setState({ inProgress: true });
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;
      if (seconds > 0) {
        this.setState((prevstate) => ({
          seconds: prevstate.seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          this.setState({ testCompleted: true });
        } else {
          this.setState((prevstate) => ({
            minutes: prevstate.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  restartBtnClicked = () => {
    this.setState({
      inputVal: "",
      initialValue: keys[Math.floor(Math.random() * keys.length)],
      minutes: 5,
      seconds: 0,
      inProgress: false,
      inputFieldError: false,
      questionedKeys: [],
      answeredKeys: [],
      testCompleted: false,
    });
    clearInterval(this.myInterval);
  };

  stopBtnClicked = () => {
    this.setState({
      inputVal: "",
      initialValue: keys[Math.floor(Math.random() * keys.length)],
      minutes: 5,
      seconds: 0,
      inProgress: false,
      inputFieldError: false,
      questionedKeys: [],
      answeredKeys: [],
      testCompleted: false,
    });
    clearInterval(this.myInterval);
  };

  renderResultView = () => {
    const { minutes, seconds, questionedKeys, answeredKeys } = this.state;
    let accuracy = 0;
    let wpm = 0;
    let kpm = 0;
    if (minutes === 0 && seconds === 0) {
      if (answeredKeys.length === 0) {
        accuracy = 0;
      } else {
        accuracy = Math.ceil(
          (answeredKeys.length / questionedKeys.length) * 100
        );
      }
      wpm = answeredKeys.length;
      kpm = Math.ceil(wpm / 5);
      console.log(accuracy, wpm);
    }
    return (
      <>
        <h1 className="resultsHeading">Results</h1>
        <ul className="resultsList">
          <li className="resultItem">
            <p className="resultsTextCSS">Total Keys Pressed: {wpm}</p>
          </li>
          <li className="resultItem">
            <p className="resultsTextCSS">Accuracy: {accuracy}%</p>
          </li>
          <li className="resultItem">
            <p className="resultsTextCSS">
              K<span className="spanTextCSS">eys </span>P
              <span className="spanTextCSS">er </span>M
              <span className="spanTextCSS">inute</span>: {kpm}
            </p>
          </li>
        </ul>
        <button
          type="button"
          className="startBtn"
          onClick={this.restartBtnClicked}
        >
          RESTART
        </button>
      </>
    );
  };

  renderNonResultView = () => {
    const { inProgress } = this.state;
    switch (inProgress) {
      case true:
        return this.renderTestWindow();
      case false:
        return this.renderMainScreenView();
      default:
        return null;
    }
  };

  renderTestWindow = () => {
    const { inputVal, initialValue, inputFieldError } = this.state;
    const inputClass = inputFieldError ? "redText" : "blackText";
    return (
      <>
        <div className="stopContainer">
          <button
            type="button"
            className="stopBtn"
            onClick={this.stopBtnClicked}
          >
            QUIT PRACTICE
          </button>
        </div>
        <p className="questionKeyCSS">
          Enter the following key:
          <span className="quesKeyCSS"> {initialValue}</span>
        </p>
        <input
          onChange={this.searchValChange}
          onKeyDown={this.verifyKey}
          className={inputClass}
          placeholder="Type here..."
          value={inputVal}
        />
      </>
    );
  };

  renderMainScreenView = () => (
    <>
      <p className="descriptionCSS">
        Touch typing is a technique that helps you type faster and more
        efficiently by using all your fingers. Typing with this technique is
        important because it can greatly improve your productivity, especially
        if you have a type-intensive job, like a programmer or a writer.
      </p>
      <div className="cardContainer">
        <h1 className="textCSS">Practicing with Orthodox Hand Position</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrhlDyd7ck5v-C9uj2ca5nmGpEermpNTiRFA&usqp=CAU"
          alt="handsPosition"
          className="positionCSS"
        />
        <button onClick={this.startBtn} className="startBtn" type="button">
          START
        </button>
      </div>
    </>
  );

  render() {
    const { minutes, seconds, testCompleted } = this.state;
    return (
      <div className="mainContainer">
        <div className="headingAndTimerContainer">
          <h1 className="mainHeading">Touch Typing</h1>
          <div className="timerContainer">
            {minutes === 0 && seconds === 0 ? (
              <h1 className="timerTextCSS">Time Out!</h1>
            ) : (
              <h1 className="timerTextCSS">
                <span className="minutesSpanCSS">Time Left: </span> 0{minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            )}
          </div>
        </div>

        <div className="subContainer">
          {testCompleted ? this.renderResultView() : this.renderNonResultView()}
        </div>
      </div>
    );
  }
}

export default MainPage;
