import React, { Component } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import FeedDetailedMap from './FeedDetailMap';
import format from 'date-fns/format';

class FeedDetailedInfo extends Component {
  state = {
    showMap: false
  };

  componentWillUnmount() {
    this.setState({
      showMap: false
    });
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

  render() {
    const { feed } = this.props;
    let feedDate;
    if (feed.date) {
      feedDate = feed.date.toDate();
    }
    return (
      <Segment.Group>
        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='teal' name='info' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{feed.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                Posted on {format(feedDate, 'dddd Do MMM')} at{' '}
                {format(feedDate, 'h:mm A')}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        {/* <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{feed.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                onClick={this.showMapToggle}
                color='teal'
                size='tiny'
                content={this.state.showMap ? 'Hide Map' : 'Show Map'}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap && (
          <FeedDetailedMap
            lat={feed.venueLatLng.lat}
            lng={feed.venueLatLng.lng}
          />
        )} */}
      </Segment.Group>
    );
  }
}

export default FeedDetailedInfo;
