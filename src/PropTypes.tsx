interface IPropTypes {
  left?: Array<{text: string; onPress?: () => void; style?: any; className?: string}>;
  right?: Array<{text: string; onPress?: () => void; style?: any; className?: string}>;
  autoClose?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  style?: any;
  /* web only */
  prefixCls?: string;
}

export default IPropTypes;
