function ReqButton({ transObj, onClickFnc }) {
  const { key, fromOrgId, disabled, rst } = transObj; 

  return (
    <button id={key} disabled={disabled} onClick={() => onClickFnc(fromOrgId)}>{rst}</button>
  );
}

export default ReqButton;