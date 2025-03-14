//converting User function component to class Component
import {Component} from "react"//a react object method that converts a class to a component thereby granting class access to component parameters such props etc. 
import classes from './User.module.css';

class User extends Component{
  componentWillUnmount(){
    console.log("Unmounted Components");
  };
  
  render(){
    //using component life cycle to execute a state once the component unmounts
    return <li className={classes.user}>{this.props.name}</li>
  }
}
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;

//Note: for class components ur state is always an object, but for function components it can be any value
//it must be a property called state. u don't determine the property name.
