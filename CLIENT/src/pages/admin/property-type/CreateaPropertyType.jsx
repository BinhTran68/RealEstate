import React from 'react'
import { Button } from '~/components'
import Title from '~/components/commons/Title'
import { CiCirclePlus } from "react-icons/ci";

const CreateaPropertyType = () => {
  return (
    <div className=''>
      <div>
        <Title title={"Create New Property Type"}>
          <Button className={"flex justify-between "}>
            <CiCirclePlus size={21}/><span>&nbsp; Create</span>
          </Button>
        </Title>
      </div>
      <div className='p-4 '>
        content
      </div>
    </div>
  )
}

export default CreateaPropertyType
