import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
        {children}
    </main>
  )
}

export default AuthLayout