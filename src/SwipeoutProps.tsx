interface SwipeoutProps {
  autoClose?:boolean;
  disabled?:boolean;
  left?:Array<{}>;
  right?:Array<{}>;
  onOpen:() => void;
  children:any;
  /** web only */
  prefixCls?:string;
  onOpen?:() => void;
}

export default SwipeoutProps;
