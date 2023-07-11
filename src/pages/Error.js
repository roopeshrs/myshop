import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'

const Error = ({msg}) => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
        <h1 className='text-8xl sm:text-6xl'>Oops!</h1>
        {error && <p className='uppercase font-semibold'>{error?.status} - {error?.statusText}</p>}
        {msg && <p className='uppercase font-semibold'>{msg}</p>}
        <button className='text-lg uppercase font-semibold bg-[#fb641b] py-2 px-4 rounded-lg text-white' onClick={() => navigate('/')}>go to homepage</button>
    </div>
  )
}

export default Error