'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

const Customers = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();


  return (
    <div>
        <h1>Usage of useRoute, usePathName</h1>
        <p className='bg-amber-600 p-2' onClick={() => router.push('/')}>Go to Home</p>
        <p>pathName: {pathName}</p>
        <p>searchParams: {JSON.stringify(searchParams.get('name'))}</p>
    
    </div>
  )
}

export default Customers