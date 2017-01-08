import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';
import {populateProperties} from '../../modules/actions';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import RaisedButton from 'material-ui/RaisedButton';


import PropertyList from './propertyList.jsx';
import AddPropForm from './addPropForm.jsx';

const cardStyle = {
  diplay: 'flex',
  'justifyContent': 'center',
  'alignItem': 'center'
}

const buttonStyle = {
  margin: '0 auto'
}

class PropertiesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProp: false
    };

    this.openHandler = this.openHandler.bind(this);
  }

  openHandler() {
    this.setState({addProp: !this.state.addProp});
  }

  componentDidMount() {
    let {dispatch} = this.props;

    axios.post('/login', {
      email: 'bob',
      password: 'test'
    })
    .then(response => {
      console.log('response', response)
    })
    .catch(err => {
      console.error('Error login', err);
    });

/*    axios.get('/property/all')
    .then(response => {
      if (response.data.length) {
        dispatch(populateProperties(response.data));
      }
    })
    .catch(err => {
      console.error('Error fetching properties', err);
    });*/
  }

  render() {

    return (
      <div>
        <PropertyList />
        <Card
        onTouchTap={()=> {this.openHandler()}}
        style={cardStyle}
        >
        <RaisedButton fullWidth={true} icon={<AddIcon />} label='Add a Property'/>
        </Card>
        <AddPropForm openHandler={this.openHandler} open={this.state.addProp}/>
        <form action="/login" method="post">
          <div>
              <label>Username:</label>
              <input type="text" name="email"/>
          </div>
          <div>
              <label>Password:</label>
              <input type="password" name="password"/>
          </div>
          <div>
              <input type="submit" value="Log In"/>
          </div>
      </form>
      </div>
    );
  }
};

export default connect()(PropertiesContainer);
          // <CardMedia><AddIcon /></CardMedia>