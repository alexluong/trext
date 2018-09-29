import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { NavigationDrawer } from 'react-md';

import NavItemLink from './components/NavItemLink';
import ConversationsPage from './components/Conversations';
import Settings from './components/Settings';

const navItems = [
{
  label: 'Conversations',
  to: '/chat',
},
{
  label: 'Settings',
  to: '/settings',
},
{
  label: 'Sign out',
  to: '/sign-out',
}
];

class ChatPage extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();

    this.state = { toolbarTitle: this.getCurrentTitle(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) });
  }

  getCurrentTitle = ({ location: { pathname } }) => {
    const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (lastSection === 'navigation-drawers') {
      return 'Chat';
    }

    return lastSection;
  };

  render() {
    const { toolbarTitle } = this.state;
    const { location } = this.props;
    return (
      <NavigationDrawer
        toolbarTitle={toolbarTitle}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
        navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        contentId="main-demo-content"
        contentClassName="md-grid"
      >
        <Switch key={location.pathname}>
          <Route path={navItems[0].to} component={ConversationsPage} />
          <Route path={navItems[1].to} component={Settings} />
        </Switch>
      </NavigationDrawer>
    );
  }
}

export default withRouter(ChatPage)




