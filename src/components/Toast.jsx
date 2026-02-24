import { useApp } from '../context/AppContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const icons = { success: <FaCheckCircle />, error: <FaExclamationCircle />, info: <FaInfoCircle /> };

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type || 'success'} toast-show`}>
      {icons[toast.type] || icons.success}
      <span>{toast.message}</span>
    </div>
  );
}
