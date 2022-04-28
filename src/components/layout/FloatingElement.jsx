import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 5px;
  padding: 20px;
  background-color: #131722;
  border-radius: 10px;
background: -webkit-linear-gradient(90deg, #131722, #321c49);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(90deg, #131722, #321c49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  box-shadow: 0 0 .05rem #fff,
            0 0 .05rem #fff,
            0 0 0.5rem #8300fa,
            0 0 0.05rem #8300fa,
            0 0 0.1rem #8300fa,
            inset 0 0 .05rem #8300fa;
`;

export default function FloatingElement({
  style = undefined,
  children,
  stretchVertical = false,
}) {
  return (
    <Wrapper
      style={{
        height: stretchVertical ? 'calc(100% - 10px)' : undefined,
        ...style,
      }}
    >
      {children}
    </Wrapper>
  );
}
