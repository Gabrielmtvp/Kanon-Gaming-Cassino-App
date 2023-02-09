import './index.css';

interface IMsg {
  msg: string;
  type: string;
}

function MsgBox(props: IMsg) {
  return <div className={`divMsg msg-${props.type}`}>{props.msg}</div>;
}

export default MsgBox;
