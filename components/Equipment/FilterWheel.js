import React from 'react'
import EquipmentItem from './EquipmemtItem';

const savedProperties = ["Name", "IsMoving", "SelectedFilter"];
const innerProperties = ["_name", "_position"];

export default function FilterWheel({navigation, handleScreenTabClick, ip, equipmentName}) {
  return (
      <EquipmentItem navigation={navigation} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={equipmentName} savedProperties={savedProperties} innerProperties={innerProperties} shortendName={"Filter"} />
  )
}