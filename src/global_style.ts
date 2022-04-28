import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  background: #070707;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #2d313c;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5b5f67;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5b5f67;
}
.ant-slider-track, .ant-slider:hover .ant-slider-track {
  background-color: #f9f7fa;
  opacity: 0.75;
}
.ant-slider-track,
.ant-slider ant-slider-track:hover {
  background-color: #f9f7fa;
  opacity: 0.75;
}
.ant-slider-dot-active,
.ant-slider-handle,
.ant-slider-handle-click-focused,
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)  {
  border: 2px solid #f9f7fa; 
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
  
}
.ant-table-tbody > tr > td {
  border-bottom: 8px -webkit-linear-gradient(90deg, #131722, #321c49);
  border-bottom: 8px linear-gradient(90deg, #131722, #321c49);
  

}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #8da0c7 !important;
}
.ant-layout {
    background: #070707;
  }
  .ant-table {
    background: #321c49;
    background: -webkit-linear-gradient(90deg, #131722, #321c49);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(90deg, #131722, #321c49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .ant-table-thead > tr > th {
    background: #131722;
  }
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-modal-content {
  background-color: #321c49;
  background: -webkit-linear-gradient(90deg, #131722, #321c49);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(90deg, #131722, #321c49); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  
  
}

@-webkit-keyframes highlight {
  from { background-color: #f9f7fa;}
  to {background-color: #131722;}
}
@-moz-keyframes highlight {
  from { background-color: #f9f7fa;}
  to {background-color: #131722;}
}
@-keyframes highlight {
  from { background-color: #f9f7fa;}
  to {background-color: #131722;}
}
.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}`;
