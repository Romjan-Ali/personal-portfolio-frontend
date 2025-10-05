import React from 'react'
import { BlogNavbar } from '../components/layout/blog/navbar' 

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <BlogNavbar />
      {children}
    </>
  )
}

export default PublicLayout