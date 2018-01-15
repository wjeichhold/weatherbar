import React from 'react';
import ListItem from './ListItem.jsx';
import axios from 'axios';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			weather: []
		}
		this.getWeather = this.getWeather.bind(this);
	}


	getWeather(lat, long) {
    axios.post('/weather', {lat: this.props.lat, long: this.props.long})
    .then((response) => {this.setState({weather: response.data})})
	}

	componentDidMount() {
		this.getWeather()
	}

	render() {
		return (
			<div>
    <h4>It's {this.state.weather[0]} degrees out! {this.state.weather[1]}</h4>
    <a href={this.props.bar.bizUrl}>{this.props.bar.bizName}</a>
    <div>{this.props.bar.address[0]}<br/>{this.props.bar.address[this.props.bar.address.length-1]}</div>
    <img src={this.props.bar.pictureUrl} alt="https://www.firstcomicsnews.com/wp-content/uploads/2016/09/Garfield-Logo-600x253.png" width="500" height="400"/>
    <p>
    <button type="button" className="btn btn-no" onClick={() => {this.props.incrementer()}}>What else you got?</button>
    </p>
  </div>
			)
	}
}


export default List;