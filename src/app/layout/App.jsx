import React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoadingSpinner from './LoadingComponent';
import { AuthenticatedUser } from '../../features/auth/authWrapper';
import { AuthenticatedUserFeed } from '../../features/auth/authWrapper';
// import Aboutus from '../../features/aboutus/aboutus';

const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingSpinner
});

const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/event/EventDashboard/EventDashboard'),
  loading: LoadingSpinner
});
const AsyncFeedDashboard = Loadable({
  loader: () => import('../../features/feed/FeedDashboard/index'),
  loading: LoadingSpinner
});
const AsyncNavBar = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingSpinner
});
const AsyncFooter = Loadable({
  loader: () => import('../../features/nav/Footer'),
  loading: LoadingSpinner
});
const AsyncCreateEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingSpinner
});
const AsyncManageEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EditEventForm'),
  loading: LoadingSpinner
});
const AsyncCreateFeedForm = Loadable({
  loader: () => import('../../features/feed/FeedForm/CreateFeedForm'),
  loading: LoadingSpinner
});
const AsyncManageFeedForm = Loadable({
  loader: () => import('../../features/feed/FeedForm/ManageFeedForm'),
  loading: LoadingSpinner
});
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingSpinner
});
const AsyncUserDetail = Loadable({
  loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingSpinner
});
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingSpinner
});
const AsyncEventDetail = Loadable({
  loader: () => import('../../features/event/EventDetailed/EventDetailedPage'),
  loading: LoadingSpinner
});
const AsyncFeedDetail = Loadable({
  loader: () => import('../../features/feed/FeedDetail/index'),
  loading: LoadingSpinner
});
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingSpinner
});
const AsyncAboutUs = Loadable({
  loader: () => import('../../features/aboutus/aboutus'),
  loading: LoadingSpinner
});
const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingSpinner
});

const App = () => (
  <div className='App'>
    <AsyncModalManager />
    <Switch>
      <Route exact path='/' component={AsyncHomePage} />
    </Switch>

    <Route
      path='/(.+)'
      render={() => (
        <div>
          <AsyncNavBar />
          <Container className='main'>
            <Switch>
              <Route path='/events' component={AsyncEventDashboard} />
              <Route path='/feeds' component={AsyncFeedDashboard} />
              <Route path='/about' component={AsyncAboutUs} />
              <Route path='/event/:id' component={AsyncEventDetail} />
              <Route path='/feed/:id' component={AsyncFeedDetail} />

              <Route
                path='/manage/:id'
                component={AuthenticatedUser(AsyncManageEventForm)}
              />
              <Route
                path='/manageFeed/:id'
                component={AuthenticatedUser(AsyncManageFeedForm)}
              />
              <Route
                path='/people'
                component={AuthenticatedUser(AsyncPeopleDashboard)}
              />
              <Route
                path='/profile/:id'
                component={AuthenticatedUser(AsyncUserDetail)}
              />
              <Route
                path='/settings'
                component={AuthenticatedUser(AsyncSettingsDashboard)}
              />
              <Route
                path='/createEvent'
                component={AuthenticatedUser(AsyncCreateEventForm)}
              />
              <Route
                path='/createFeed'
                component={AuthenticatedUserFeed(AsyncCreateFeedForm)}
              />

              <Route component={AsyncNotFound} />
            </Switch>
          </Container>{' '}
          <AsyncFooter />
        </div>
      )}
    />
  </div>
);

export default App;
