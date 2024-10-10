import React from 'react'

function Button({children, ...props}) {
  return (
    <button className= "tracking-wide bg-primary py-2 px-3 text-gray-400 capitalize rounded-md mt-5" {...props}>{children}</button>
  )
}

export default Button
