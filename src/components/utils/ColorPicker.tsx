import React, { Dispatch, SetStateAction, useState } from 'react'

import { ChromePicker } from "react-color"
import "../../styles/utils/ColorPicker.scss"

type ColorPickerProps = {
  color: string,
  setColor: Dispatch<SetStateAction<string>>
}

function ColorPicker({color, setColor}: ColorPickerProps) {
  const [pickAColor, setPickAColor] = useState(false)


  return (
    <div className="color-picker-button" onClick={() => {console.log(pickAColor); setPickAColor(!pickAColor)}}
      style={{backgroundColor: color}}>
      {
        pickAColor &&
        <div className="color-picker-parent" >
          <ChromePicker color={color} onChange={(newColor) => setColor(newColor.hex)}/>
        </div>
      }
    </div>
  )
}

export default ColorPicker
