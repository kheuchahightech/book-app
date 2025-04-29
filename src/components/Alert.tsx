import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface AlertProps {
  children: ReactNode;
  type: 'success' | 'error' | 'info';
  dismissible?: boolean;
  duration?: number | null;
}

const Alert = ({ children, type, dismissible = true, duration = 5000 }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (duration && isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, isVisible]);
  
  if (!isVisible) return null;
  
  const typeStyles = {
    success: {
      containerClass: 'bg-green-50 border-green-400',
      textClass: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    },
    error: {
      containerClass: 'bg-red-50 border-red-400',
      textClass: 'text-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    },
    info: {
      containerClass: 'bg-blue-50 border-blue-400',
      textClass: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-400" />,
    },
  };
  
  const { containerClass, textClass, icon } = typeStyles[type];
  
  return (
    <div className={`${containerClass} border-l-4 p-4 rounded-r-md mb-4`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div className={`${textClass} flex-grow`}>
          {children}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              onClick={() => setIsVisible(false)}
              className={`${textClass} hover:text-opacity-75 inline-flex focus:outline-none`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;