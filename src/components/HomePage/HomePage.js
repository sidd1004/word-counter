import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';
import { fetchText } from '../../actions';


// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./HomePage.css'); // eslint-disable-line global-require
}

export class HomePage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      currentTime: 0
    };
  }

  editedStr = '';
  eachWord = '';
  modString = '';
  checkStatus = 'false';
  eachWordEnterted = '';
  componentDidMount() {
    this.props.fetchText();
    this.executeTimer();
  }

  executeTimer() {
    setInterval(() => {
      this.setState({ currentTime: this.state.currentTime + 1 });

      if (this.eachWordEnterted.length > 0 && this.state.currentTime == 119 && (this.checkStatus) === 'true') {
        console.log('work');

        alert(`Game over, your wmp is: ${Number(this.eachWordEnterted.length) / 2}`);
      }
      else if (this.state.currentTime == 119 && this.checkStatus === 'false') {
        alert('Game over, you typed words wrong');
      }
    }, 1000);
  }

  removeParaTags() {
    const orgString = this.props.text;
    this.editedStr = orgString.replace(/<[^>]*>/g, '');
    this.editedStr = (this.editedStr).substring(0, 250);
    this.eachWord = (this.editedStr).split(/[.,\s]/g);
    this.eachWord = (this.eachWord).filter((item, index) => {
      if (item === '') {
        return false;
      }
      else if (index === 0)
          { this.modString = `${this.modString}${item}`; }
      else
          { this.modString = `${this.modString} ${item}`; }
      return item;
    });

    return (
      <p>
        {(this.eachWord).map((word, index) => {
          const color = `color-${index}`;
          return <span key={index} className={color} ref={index}> {word} </span>;
        })}

      </p>
    );
  }

  handleTextChange(e) {
    e.preventDefault();
    this.setState({ textValue: e.target.value }, this.checkText);
  }

  checkText() {
    const textEntered = this.state.textValue;
    this.eachWordEnterted = (textEntered).split(/[.,\s]/g);
    const originalText = this.modString;
    const textEnteredLength = textEntered.length;
    const subStringOriginal = (this.modString).substring(0, textEnteredLength);
    if (subStringOriginal === textEntered) {
      this.checkStatus = 'true';
    }
    else {
      this.checkStatus = 'false';
    }
  }

  render() {
    if (this.props.text === undefined) {
      return null;
    }
    else {
      return (
        <div className="HomePage">
          {this.state.currentTime}
          {this.removeParaTags()}
          <div>
            <textarea name="inputText" id="inputText" style={{ marginTop: `${30}px`, width: `${100}%`, height: `${100}px` }} onChange={this.handleTextChange.bind(this)} />
            {this.checkStatus}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { text } = state;
  return {
    text
  };
};

export default connect(mapStateToProps, { fetchText })(HomePage);
