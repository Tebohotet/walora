import { toastr } from 'react-redux-toastr';
import { FETCH_FEEDS, DELETE_FEED } from './feedConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import { createNewFeed } from '../../app/common/util/helpers';
import moment from 'moment';
import firebase from '../../app/config/firebase';
import compareAsc from 'date-fns/compare_asc';

export const createFeed = feed => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newFeed = createNewFeed(user, photoURL, feed);
    try {
      let createdFeed = await firestore.add(`feeds`, newFeed);
      await firestore.set(`feed_attendees/${createdFeed.id}_${user.uid}`, {
        feedId: createdFeed.id,
        userUid: user.uid,
        feedDate: feed.date,
        host: true
      });
      toastr.success('Success', 'Feed has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
      console.log(error);
    }
  };
};

export const updateFeed = feed => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    if (feed.date !== getState().firestore.ordered.feeds[0].date) {
      feed.date = moment(feed.date).toDate();
    }
    try {
      let feedDocRef = firestore.collection('feeds').doc(feed.id);
      let dateEqual = compareAsc(
        getState().firestore.ordered.feeds[0].date.toDate(),
        feed.date
      );
      if (dateEqual !== 0) {
        let batch = firestore.batch();
        await batch.update(feedDocRef, feed);

        let feedAttendeeRef = firestore.collection('feed_attendee');
        let feedAttendeeQuery = await feedAttendeeRef.where(
          'feedId',
          '==',
          feed.id
        );
        let feedAttendeeQuerySnap = await feedAttendeeQuery.get();

        for (let i = 0; i < feedAttendeeQuerySnap.docs.length; i++) {
          let feedAttendeeDocRef = await firestore
            .collection('feed_attendee')
            .doc(feedAttendeeQuerySnap.docs[i].id);
          await batch.update(feedAttendeeDocRef, {
            feedDate: feed.date
          });
        }
        await batch.commit();
      } else {
        await feedDocRef.update(feed);
      }
      dispatch(asyncActionFinish());
      toastr.success('Success', 'feed has been updated');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const cancelToggle = (cancelled, feedId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'Are you sure you want to cancel the feed?'
    : 'This reactivate the feed - are you sure?';
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`feeds/${feedId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFeedsForDashboard = lastFeed => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const feedsRef = firestore.collection('feeds');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastFeed &&
      (await firestore
        .collection('feeds')
        .doc(lastFeed.id)
        .get());
    let query;

    lastFeed
      ? (query = feedsRef
          .where('date', '<=', today)
          .orderBy('date', 'desc')
          .startAfter(startAfter)
          .limit(2))
      : (query = feedsRef
          .where('date', '<=', today)
          .orderBy('date', 'desc')
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let feeds = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      feeds.push(evt);
    }
    dispatch({ type: FETCH_FEEDS, payload: { feeds } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addFeedComment = (feedId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`feed_chat/${feedId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error('Oops', 'Problem adding comment');
  }
};
export const deleteFeed = feedId => {
  return {
    type: DELETE_FEED,
    payload: {
      feedId
    }
  };
};
