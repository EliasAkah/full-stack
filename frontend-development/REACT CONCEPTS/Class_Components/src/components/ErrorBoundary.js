import {Component} from "react"

class ErrorBoundary extends Component{
    //handling error for react application using "componentDidCatch" method when u want the parent component to handle the error when any of its child component fails
    constructor(){
        super();
        this.state = {hasError: false}
    }

    //automatically called when an error occurs
    componentDidCatch(error){
        console.log(error)
        this.setState({hasError: true})

    }
    render(){
        if(this.state.hasError){
            return <p>Entered an Invalid Input</p>
        }
        return this.props.children
    }
}
export default ErrorBoundary;
//NOTE: We will wrapp the ErrorBoundary component arround the component that is likely going to have an error 
// to prevent the entire react application from clashing. it is used in in both class and function components
// to bring about this effect try and catch would have on a javascript application