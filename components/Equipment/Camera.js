import React from 'react'
import EquipmentItem from './EquipmemtItem';

const savedProperties = ["Name", "Gain", "Offset", "PixelSize", "DewHeaterOn", "Temperature", "CoolerOn", "CoolerPower"];

export default function Camera({navigation, equipmentName}) {
  return (
      <EquipmentItem navigation={navigation} equipmentName={equipmentName} savedProperties={savedProperties} />
  )
}