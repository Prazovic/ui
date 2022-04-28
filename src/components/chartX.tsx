import React from 'react';

const symb1='';

function App() {
  var symb2='chart.html?cryp=';
  var symb3=symb2+symb1;

  const style = {
    height: '340px',
    width: '96vw',
    borderWidth: '0px',
    scrolling:'no',
    overflow:'hidden',
    display: 'flex',


   }

  return (
    <div className='App'>
        <p></p>
        <iframe src={symb3} style = {style}>

        </iframe>
    </div>
  );
}

export default App;