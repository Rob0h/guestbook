import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';

import HomeIcon from 'material-ui/svg-icons/action/home';
import GraphIcon from 'material-ui/svg-icons/action/assessment';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import LoginContainer from './loginContainer.jsx';




const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

const homeIcon = <HomeIcon />;
const graphIcon = <GraphIcon />;
const settingsIcon = <SettingsIcon />;

const mapStateToProps = function(store) {
  return {
    loggedIn: store.userState.loggedIn
  };
}

class Main extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <LoginContainer />

        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Tabs>
              <Tab
              label='MY PROPERTIES' value={0} icon={homeIcon}
              containerElement={<Link to='/properties'></Link>}/>
              <Tab
              label='MY ANALYTICS' value={1} icon={graphIcon}
              containerElement={<Link to='/analytics'></Link>}/>
              <Tab
              label='SETTINGS' value={2} icon={settingsIcon}
              containerElement={<Link to='/settings'></Link>}/>
            </Tabs>
            <div className='container'>
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

export default connect(mapStateToProps)(Main);