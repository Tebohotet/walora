import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modals/modalActions';

export const AuthenticatedUserFeed = connectedReduxRedirect({
  wrapperDisplayName: 'AuthenticatedUser',
  allowRedirectBack: true,
  redirectPath: '/feeds',
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLocation => dispatch => dispatch(openModal('UnauthModal'))
});
