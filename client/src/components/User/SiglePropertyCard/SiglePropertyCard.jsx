import { Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SiglePropertyCard = ({property,setProperty}) => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <Button variant='gradient' onClick={()=>navigate(`/booking/${property._id}`)} className='bg-blue-100 mt-80 mx-12'>
        Book The Property
      </Button>
    </div>
  )
}

export default SiglePropertyCard
