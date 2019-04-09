import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import FeedDetailedHeader from './FeedDetailHeader';
import FeedDetailedInfo from './FeedDetailInfo';
import FeedDetailedChat from './FeedDetailChat';
import FeedDetailedSidebar from './FeedDetailSidebar';
import {
  objectToArray,
  createDataTree
} from '../../../app/common/util/helpers';
import { goingToFeed, cancelGoingToFeed } from '../../user/userActions';
import { addFeedComment } from '../feedActions';

const mapState = (state, ownProps) => {
  let feed = {};

  if (state.firestore.ordered.feeds && state.firestore.ordered.feeds[0]) {
    feed = state.firestore.ordered.feeds[0];
  }

  return {
    feed,
    auth: state.firebase.auth,
    feedChat:
      !isEmpty(state.firebase.data.feed_chat) &&
      objectToArray(state.firebase.data.feed_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToFeed,
  cancelGoingToFeed,
  addFeedComment
};

class FeedDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`feeds/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`feeds/${match.params.id}`);
  }

  render() {
    const {
      feed,
      auth,
      goingToFeed,
      cancelGoingToFeed,
      addFeedComment,
      feedChat
    } = this.props;
    const attendees = feed && feed.attendees && objectToArray(feed.attendees);
    const isHost = feed.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(feedChat) && createDataTree(feedChat);
    return (
      <Grid>
        <Grid.Column width={10}>
          <FeedDetailedHeader
            feed={feed}
            isHost={isHost}
            isGoing={isGoing}
            goingToFeed={goingToFeed}
            cancelGoingToFeed={cancelGoingToFeed}
          />
          <FeedDetailedInfo feed={feed} />
          <FeedDetailedChat
            feedChat={chatTree}
            addFeedComment={addFeedComment}
            feedId={feed.id}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <FeedDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`feed_chat/${props.match.params.id}`])
)(FeedDetailedPage);
