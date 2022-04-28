import React from 'react';

const styleX = {
  height: '550px',
  width: '96vw',
  borderWidth: '0px',
  scrolling:'no',
  overflow:'hidden',
  display: 'flex',


 }

export default function AppY({
  address,
}: {
  address: string;
}) {
  return (
<div className='AppY'>
<p></p>
<iframe title='asw' src={'https://baliarena.com/chart/chart.html?cryp=' + address} style = {styleX}>
</iframe>
</div>

  );
}
