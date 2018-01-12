import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    <img src={props.bar.pictureUrl}/>
    <button type="button" className="btn btn-yes" onClick={() => {props.incrementer()}}>Into it!</button>
    <button type="button" className="btn btn-no">What else you got?</button>
  </div>
)

export default List;