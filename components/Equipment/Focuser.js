import React from 'react'
import EquipmentItem from './EquipmemtItem';

const savedProperties = ["Name", "Position", "StepSize", "Temperature", "IsMoving", "IsSettling"];

export default function Camera({navigation, handleScreenTabClick, ip, equipmentName}) {
  return (
      <EquipmentItem navigation={navigation} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={equipmentName} savedProperties={savedProperties} />
  )
}