"use client"

import { useState } from "react"

const ClientChecker = () => {
   const [count, setCount] = useState(0);  




  return (
    <div className="flex flex-col gap-y-6">
        <h1>ClientChecker</h1>
        <div>{count}</div>
        <div className="flex gap-4">
            <button onClick={() => setCount(c => c - 1)} className="bg-blue-600 text-white p-2">Decrement</button>
            <button onClick={() => setCount(c => c + 1)}  className="bg-blue-600 text-white  p-2">Increment</button>
        </div>
    </div>
  
  )
}

export default ClientChecker