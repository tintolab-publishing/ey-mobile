import React from 'react'

const Executive = ({ dataSet }) => {
  const executiveData = dataSet || {};
  return (
    <tr>
      <td>{executiveData.name}</td>
      <td>{executiveData.ownershipType ? executiveData.ownershipType : '-'}</td>
      <td>{executiveData.position ? executiveData.position : '-'}</td>
    </tr>
  )
}

export default Executive