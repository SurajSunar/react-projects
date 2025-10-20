
import React from 'react'

export const getQuotes = async () => {
  const results = await fetch('https://dummyjson.com/quotes');
  const data = await results.json();
  return await data;
}

const QuotesList = async () => {
  const { quotes } = await getQuotes()

  return (
    <div className='grid grid-cols-5 gap-2 m-2'>
      {
        quotes.map(quote => <div className='bg-amber-100 p-2 rounded-lg space-y-4 flex flex-col justify-between h-[200px]'>
           <h1>{quote.quote}</h1>
            <p>{quote.author}</p>
          </div>)
      }
    </div>
  )
}

export default QuotesList