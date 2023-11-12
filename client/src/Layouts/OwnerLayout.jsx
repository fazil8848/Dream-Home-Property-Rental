import React from 'react'
import OwnerHeader from '../components/Owner/OwnerHeader/OwnerHeader'
import OwnerFooter from '../components/Owner/OwnerFooter/OwnerFooter'
import { Outlet } from 'react-router-dom'

const OwnerLayout = () => {
  return (
    <>
      <OwnerHeader/>
      <Outlet/>
      <OwnerFooter/>
    </>
  )
}

export default OwnerLayout
