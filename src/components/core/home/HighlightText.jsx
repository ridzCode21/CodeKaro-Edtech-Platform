import React from 'react'
import styled from 'styled-components'

const HighlightText = ({tex,colorname,active}) => {
  console.log(colorname)
  const css = {
      color : colorname,
  }
  return (
    <span className={` ${active?"font-bold":""} `} style={css}>
        {" "} {tex}
    </span>
  )
}

export default HighlightText