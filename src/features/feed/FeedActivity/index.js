import React from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';

import FeedActivityItem from './FeedActivityItem';

const FeedActivity = ({ activities, contextRef }) => (
  <Sticky context={contextRef} offset={100}>
    <Header attached='top' content='Recent Activity' />
    <Segment attached>
      <Feed>
        {activities &&
          activities.map(feedactivity => (
            <FeedActivityItem
              key={feedactivity.id}
              feedactivity={feedactivity}
            />
          ))}
      </Feed>
    </Segment>
  </Sticky>
);

export default FeedActivity;
