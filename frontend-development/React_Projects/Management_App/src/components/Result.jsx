// import React, {useRef, useState} from 'react'
// import Form from './Form.jsx'
// import SideBar from './SideBar.jsx'
// import ReactDOM from  "react-dom"


// function FormResult({titleList}) {
//     const [comment, setComment] = useState(null);
//     const [date, setDate] = useState(null);
//     const outputRef = useRef();

//     function updateComment(){
//         const currentComment = outputRef.current.commentValue();
//         setComment(currentComment);
//     }

//     function updateDate(){
//         const currentDate = outputRef.current.dateValue;
//     }

//   return ReactDOM.createPortal(
//     <div className = "flex w-full h-full">
//         <SideBar />
//         <Form />
//     </div>,
//     document.querySelector("body")
//   )
// }

// export default FormResult
