import * as React from 'react';

const ListItem = ({current, onUpdate, tagId}) =>
  { 
    var items = [];
    for (let i = 1; i < 10; i++) {
      items.push(<li key={i} className={i === current && 'active'} onClick={(...args) => onUpdate(tagId, i)}><span>{i}</span></li>)
    }

  return( 

      <ul className="pagination pull-right pagination-sm"> 
        { items }
      </ul> 

    )
  }
export default ListItem;
