import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      latitude: null,
      longitude: null
    }
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    var success = (pos) => {
      var longitude = pos.coords.longitude; 
      var latitude = pos.coords.latitude;
      this.setState({ longitude, latitude }, () => axios.post('/recommendations', {lat: this.state.latitude, long: this.state.longitude})
        .then((response) => {console.log(response)})
    )};

    var error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  componentDidMount() {
    this.getLocation()
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));