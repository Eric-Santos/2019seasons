import React from 'react';
import ReactDOM from 'react-dom';

//class component needs constructor with props that will update at component level,super needed to use React.Component original parent constructor, initialize state with this.state{property: null"for use with unknown numbers"}
class App extends React.Component {
  constructor(props) {
    super(props);
    //this is the only time we do direct assignment!!
    this.state = { lat: null, errorMessage: '' };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }
    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
