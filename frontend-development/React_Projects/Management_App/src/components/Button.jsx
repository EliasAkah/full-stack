import React from 'react'

function Button({children, ...props}) {
  return (
    <button className = "bg-primary py-2 px-3 text-gray-400 capitalize rounded-sm mt-5 tracking-wide" {...props}>{children}</button>
  )
}

export default Button
