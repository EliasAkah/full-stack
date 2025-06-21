import { Fragment, Component } from 'react';
import UsersContext from '../store/users-context.js';

import Users from './Users';
import classes from './UserFinder.module.css';
import ErrorBoundary from "./ErrorBoundary.js"
const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];
class UserFinder extends Component{
  //fetching the context value we can use .consumer component to wrap the jsx code we want pass the context value to,  or we use the "static" keyword
  static contextType = UsersContext;// return a "context" object which is the value of the .provider component

  constructor(){
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    }
  }

  //using component life cycle to update state when the component is rendered for the first time
  componentDidMount(){
    this.setState({filteredUsers: this.context.users});
  }
  //using component life cycle to update a fileteredUsers state. it automatically called when userFind is re-rendered
  componentDidUpdate(prevProp, prevState){
    if(prevState.searchTerm !== this.state.searchTerm){
      this.setState({filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))})
    }
  }
  //use for updating searchTerm state
  searchChangeHandler(event){
    this.setState({searchTerm: event.target.value})
  }
  render(){
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;

// NOTE: ErrorBoundary can be used to wrap as many component as needed