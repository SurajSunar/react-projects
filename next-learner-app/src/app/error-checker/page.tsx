'use client'

import React from 'react'

const ErrorPage = () => {
   const num = Math.random()

   if(num < 0.5) {
      throw new Error('eqeqweq')
   }


  return (
    <div>Page to check Error</div>
  )
}

export default ErrorPage