import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  //automatically called immediately the class component is rendered within a parent component
  constructor(){
    super();
    this.state = {
      showUsers: false,
      manage: "me"
    }//state the different state variable u want to use within the class component
  }

  componentDidUpdate(){
    if(this.props.users.length === 0){
      throw new Error("User does not Exist")
    }
  }
  // automatically called when ever the state changes
  toggleUsersHandler(){
    this.setState((curState) => {
      return{showUsers: !curState.showUsers}
    })
  }
  render(){
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
};

export default Users;

//NOTE: this.props.propsvariableParsedbyparent component is used the fetch the props values passed 
// by parent coponent without having to call props as an argument in any of the methods in class components

//third party error handling component for react => https://github.com/bvaughn/react-error-boundary