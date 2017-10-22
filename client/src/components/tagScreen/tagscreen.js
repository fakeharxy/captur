import * as React from 'react';
import {ListGroup, ListGroupItem, Badge} from 'react-bootstrap'


const TagScreen = ({tags}) =>
 ( <ListGroup>
  {tags.map((tag) =>
    <ListGroupItem key={tag.id} className='taglist' bsStyle="success">{tag.name} <Badge>{tag.importance}</Badge></ListGroupItem>
  )}
  </ListGroup>
  )

export default TagScreen;
