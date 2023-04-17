import React from 'react'

const index = ({ formType, selectedRow }: { formType: string, selectedRow: any }) => {
  console.log('made it?');
  
  console.log('selectedRow', selectedRow)
  return (
    <div>{formType}</div>
  )
}

export default index