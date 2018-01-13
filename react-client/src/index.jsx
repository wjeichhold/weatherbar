import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import MapWithADirectionsRenderer from './components/googleMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      latitude: null,
      longitude: null,
      increment: 0
    }
    this.getLocation = this.getLocation.bind(this);
    this.incrementer = this.incrementer.bind(this);
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
      console.log(longitude, latitude)
      this.setState({ longitude, latitude }, () => axios.post('/recommendations', {lat: this.state.latitude, long: this.state.longitude})
        .then((response) => {this.setState({items: response.data})})
      )
    };

    var error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  componentDidMount() {
    this.getLocation()
  }

  incrementer() {
    if (this.state.increment <= 9) {
    this.setState({increment: this.state.increment+1})
    } else {
      alert('make up your damn mind!')
    }
  }

  render () {
    if (this.state.items.length === 0) {
      return (<div>
        <h1>Choosing your bar!</h1>
        <img src='https://loading.io/spinners/pies/lg.pie-chart-loading-gif.gif' className='img-loader'/>
        </div>
        )
    } else {
    return (<div>
      <h1>Item List</h1>
      <List bar={this.state.items[this.state.increment]} incrementer={this.incrementer} lat={this.state.latitude} long={this.state.longitude}/>
      <MapWithADirectionsRenderer lat={this.state.latitude} long={this.state.longitude} bar={this.state.items[this.state.increment]}/>
    </div>)
  }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));