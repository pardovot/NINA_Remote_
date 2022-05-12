import React from 'react'
import EquipmentItem from './EquipmemtItem';

const savedProperties = ["Name", "Position", "StepSize", "Temperature", "IsMoving", "IsSettling"];

export default function Camera({handleScreenTabClick, ip, equipmentName}) {
  return (
      <EquipmentItem handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={equipmentName} savedProperties={savedProperties} />
  )
}