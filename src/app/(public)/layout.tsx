import React from 'react'
import { Navbar } from '../components/layout/public/navbar'

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default PublicLayout
