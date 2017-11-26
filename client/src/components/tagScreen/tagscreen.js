import * as React from 'react';

import {
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

import ListItem from './tagPagination.js';


class TagScreen extends React.Component {

  updateTag(id, value) {
    this.setState(this.props.tags.reduce( (current, item) => {
      if (item.id === id) {
        item.importance = value;
      }
      current.push(item);
      return current; }, []
    ) );
    const formData = {
      "taginfo": {
         "id": id, "value": value
        }
    }
    this.sendDatatoApi('tags/update', formData);
  }

  sendDatatoApi(where, what) {
    var request = new XMLHttpRequest();
    request.open('POST', '/api/' + where, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(what));
  }

  render() {
     return(
     <ListGroup>
        { this.props.tags.map((tag) =>
        ( <span key={tag.id}>
          <ListGroupItem className='taglist' bsStyle="success"><p>{tag.name}</p>
          <ListItem
            current={tag.importance}
            onUpdate={(...args) => this.updateTag(...args)}
            tagId={tag.id} />
          </ListGroupItem>
        </span>
      )
    )}
   </ListGroup>
 )

  }
}
export default TagScreen;
