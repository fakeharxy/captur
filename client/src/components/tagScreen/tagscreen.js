import * as React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap'


const TagScreen = ({tags}) =>
 ( <ListGroup>
  {tags.map((tag) =>
    <span key={tag.id}>
    <ListGroupItem className='taglist' bsStyle="success"><p>{tag.name}</p>
    <ul className="pagination pull-right pagination-sm">
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li className="active"><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li><a href="#">7</a></li>
        <li><a href="#">8</a></li>
        <li><a href="#">9</a></li>
    </ul>
</ListGroupItem> 
    </span>
  )}
  </ListGroup>
  )

export default TagScreen;
