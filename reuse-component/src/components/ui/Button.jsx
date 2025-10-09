import { LoaderCircle, Spline } from 'lucide-react'
import React from 'react'

const THEMES = {
    primary: 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500',
    secondary: 'bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500',
    danger: 'bg-gradient-to-r from-red-500 via-red-400 to-red-500',
    warning: 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500',
    success: 'bg-gradient-to-r from-green-500 via-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-800 via-red-400 to-red-500'
}

const SIZES = {
    sm: 'px-2 py-1',
    md: 'px-3 py-2',
    lg: 'px-4 py-3',
    xl: 'px-5 py-4'
}

const Button = ({children, classes, theme = 'primary', size = 'md', loading, onclick = ()=> null}) => {

  return (
    <button className={`${THEMES[theme]} ${SIZES[size]}  rounded-lg text-white capitalize flex gap-x-2 ${classes}`} onClick={onclick}>
        {loading && <LoaderCircle className="animate-spin" />}
        {children}
    </button>
  )
}

export default Button