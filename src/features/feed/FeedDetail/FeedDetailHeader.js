import React from 'react';
import { Segment, Image, Item, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const feedImageStyle = {
  filter: 'brightness(30%)'
};

const feedImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const FeedDetailedHeader = ({
  feed,
  isHost,
  isGoing,
  goingToFeed,
  cancelGoingToFeed
}) => {
  let feedDate;
  if (feed.date) {
    feedDate = feed.date.toDate();
  }
  return (
    <Segment.Group>
      {/* <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${feed.category}.jpg`}
          fluid
          style={feedImageStyle}
        />

        <Segment basic style={feedImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={feed.title}
                  style={{ color: 'white' }}
                />
                <p>{format(feedDate, 'dddd Do MMMM')}</p>
                <p>
                  Hosted by <strong>{feed.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment> */}

      <Segment attached='bottom'>
        {!isHost && (
          <div>
            {isGoing ? (
              <Button onClick={() => cancelGoingToFeed(feed)}>Dislike</Button>
            ) : (
              <Button onClick={() => goingToFeed(feed)} color='teal'>
                LIKE
              </Button>
            )}
          </div>
        )}

        {isHost && (
          <Button as={Link} to={`/manageFeed/${feed.id}`} color='orange'>
            Manage Feed
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default FeedDetailedHeader;
