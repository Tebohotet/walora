import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FeedListAttendee from './FeedListLike';
import format from 'date-fns/format';

class FeedListItem extends Component {
  render() {
    const { feed, deleteFeed } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={feed.hostPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{feed.title}</Item.Header>
                <Item.Description>Posted by {feed.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment />
        <Segment secondary>
          People who liked are :
          <List horizontal>
            {feed.attendees &&
              Object.values(feed.attendees).map((attendee, index) => (
                <FeedListAttendee key={index} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{feed.description}</span>

          <Button
            as={Link}
            to={`/feed/${feed.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default FeedListItem;
