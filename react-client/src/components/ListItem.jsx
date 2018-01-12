import React from 'react';

const ListItem = (props) => (
  <div>
    <img src={props.item.pictureUrl}/>
    <button type="button" className="btn btn-yes">Into it!</button>
    <button type="button" className="btn btn-no">What else you got?</button>
  </div>
)

export default ListItem;