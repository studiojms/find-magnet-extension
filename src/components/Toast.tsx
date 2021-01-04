interface ToastProps {
  message: string;
  active: boolean;
}

function Toast({ message, active }: ToastProps) {
  return <div className={`toast ${active ? 'active' : ''}`}>{message}</div>;
}

export default Toast;
