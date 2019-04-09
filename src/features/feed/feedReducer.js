import { createReducer } from '../../app/common/util/reducerUtil';
import {
  CREATE_FEED,
  DELETE_FEED,
  UPDATE_FEED,
  FETCH_FEEDS
} from './feedConstants';

const initialState = [];

export const createFeed = (state, payload) => {
  return [...state, Object.assign({}, payload.feed)];
};

export const updateFeed = (state, payload) => {
  return [
    ...state.filter(feed => feed.id !== payload.feed.id),
    Object.assign({}, payload.feed)
  ];
};

export const deleteFeed = (state, payload) => {
  return [...state.filter(feed => feed.id !== payload.feedId)];
};

export const fetchFeeds = (state, payload) => {
  return payload.feeds;
};

export default createReducer(initialState, {
  [CREATE_FEED]: createFeed,
  [UPDATE_FEED]: updateFeed,
  [DELETE_FEED]: deleteFeed,
  [FETCH_FEEDS]: fetchFeeds
});
