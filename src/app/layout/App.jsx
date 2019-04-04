import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import FeedDashboard from '../../features/Feed/FeedDashboard/FeedDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import FeedForm from '../../features/Feed/FeedForm/FeedForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import FeedDetailedPage from '../../features/Feed/FeedDetailed/FeedDetiledPage';
import HomePage from '../../features/home/HomePage';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route
          path='/(.+)'
          render={() => (
            <div>
              <NavBar />
              <Container className='main'>
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/test' component={TestComponent} />
                  <Route path='/event/:id' component={EventDetailedPage} />
                  <Route path='/feeds' component={FeedDashboard} />
                  <Route path='/feed/:id' component={FeedDetailedPage} />
                  <Route path='/people' component={PeopleDashboard} />
                  <Route path='/profile/:id' component={UserDetailedPage} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                  <Route path='/createFeed' component={FeedForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;

/*Button Test
<h1>Walora</h1>
        <button className='ui  icon button'>
          <i className='smile icon' />
          CSS Button
        </button>
        <Button icon='smile' content='React Button' />
*/
