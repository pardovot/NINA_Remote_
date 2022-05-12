import React from 'react'
import EquipmentItem from './EquipmemtItem';

const savedProperties = ["Name", "Gain", "Offset", "PixelSize", "DewHeaterOn", "Temperature", "CoolerOn", "CoolerPower"];

export default function Camera({handleScreenTabClick, ip, equipmentName}) {
  return (
      <EquipmentItem handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={equipmentName} savedProperties={savedProperties} />
  )
}