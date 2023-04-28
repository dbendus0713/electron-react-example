import { useState } from 'react';
// import ReqButton from './ReqButton';
import TransRow from './TransRow';
import { SEND_REQ_TRANSFER, SEND_CHANGE_BTN } from '../constants/RenderCode'; 

function Table({ columns, data }) { 
  const {ipcRenderer} = window.renderer;
  
  const [list, setList] = useState(data);

  const reqTransferApi = (fromOrgId) => {
    setList(list.map(v => {
      if (v.fromOrgId === fromOrgId) { 
        v.rst = 'R'; 
        v.disabled = true;
        ipcRenderer.send(SEND_REQ_TRANSFER, v); 
      }
      return v;
    }));
  }
  
  ipcRenderer.on(SEND_CHANGE_BTN, (event, key, fromOrgId, btnStr) => {
    console.log("SEND_CHANGE_BTN: ", key, fromOrgId, btnStr);
    setList(list.map(v => {
      if (v.fromOrgId === fromOrgId) { 
        v.rst = btnStr;
        v.disabled = !(btnStr === "R" || btnStr === "F"); 
        if (btnStr === "F") {
          alert("실패", key, fromOrgId, btnStr);
        } else if (btnStr === "C") {
          ipcRenderer.send(SEND_REQ_TRANSFER, list[key*1 + 1]); 
        }
      }
      return v;
    }));
  });
    
  return ( 
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((transObj, index) => (
          <TransRow key={transObj.key} transObj={transObj} onClickFnc={reqTransferApi} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;