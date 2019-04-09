import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Feeds', pane: { key: 'allFeeds' } },
  { menuItem: 'Past Feeds', pane: { key: 'pastFeeds' } },
  { menuItem: 'Future Feeds', pane: { key: 'futureFeeds' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const UserDeteiledFeeds = ({ feeds, feedsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={feedsLoading}>
        <Header icon='calendar' content='Feeds' />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {feeds &&
            feeds.map(feed => (
              <Card as={Link} to={`/feed/${feed.id}`} key={feed.id}>
                <Image src={`/assets/categoryImages/${feed.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign='center'>{feed.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(feed.date.toDate(), 'DD MMM YYYY')}</div>
                    <div>{format(feed.date.toDate(), 'h:mm A')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDeteiledFeeds;
