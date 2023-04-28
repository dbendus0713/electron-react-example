
import ReqButton from './ReqButton';


function TransRow({ transObj, onClickFnc }) { 

  return (
    <> 
      <tr key={transObj.key}>
        <td>{transObj.fromOrgId}</td>
        <td>{transObj.fromName}</td>
        <td>{transObj.targetOrgId}</td>
        <td>{transObj.targetName}</td>
        <td>{transObj.cnt}</td>
        <td>  
          <ReqButton transObj={transObj} key={transObj.key} onClickFnc={onClickFnc} />
        </td> 
      </tr> 
    </>
  );
}


export default TransRow;