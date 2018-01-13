import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> {props.bar.bizName} </h4>
    <img src={props.bar.pictureUrl}/>
    <button type="button" className="btn btn-yes">Into it!</button>
    <button type="button" className="btn btn-no" onClick={() => {props.incrementer()}}>What else you got?</button>
  </div>
)

export default List;