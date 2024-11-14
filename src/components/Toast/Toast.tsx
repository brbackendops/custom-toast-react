import { useState , useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'info' | 'warning'


export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?:number;
}

interface ToastProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
    warning: AlertCircle
}

const colors = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
};

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500',
};


const Toast: React.FC<ToastProps> = ({ position = 'top-right' }) => {
    const [toasts,setToasts] = useState<Toast[]>([])

    useEffect(() => {
        const handleToast = (event: CustomEvent<Toast>) => {
            const newToast = {
                ...event.detail,
                id: Math.random().toString(36).substring(2,9)
            };

            setToasts((prev) => [...prev,newToast]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
            }, event.detail.duration || 5000)
        }

        window.addEventListener('show-toast' as any, handleToast);

        return () => window.removeEventListener('show-toast' as any,handleToast);
    },[])

    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };    

    return createPortal(
        <div className={`fixed z-50 w-full max-w-sm ${positionClasses[position]}`} aria-live='polite'>
            {toasts.map((toast) => {
                const Icon = icons[toast.type];
                return (
                    <div key={toast.id} className={`
                        ${colors[toast.type]} mb-3 flex items-center justify-between rounded-lg
                        border p-4 shadow-lg animate-[slideIn_0.2s_ease-in-out] hover:shadow-xl transition-all
                        `
                    } role='alert'>
                        <div className='flex items-center space-x-3'>
                            <Icon className={`h-5 w-5 ${iconColors[toast.type]}`}/>
                            <p className='font-medium'>{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className='ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10'
                            aria-label='Close toast'
                        >
                            <X className='h-4 w-4'/>
                        </button>
                    </div>
                );
            })}
        </div>,
        document.body
    );
}


export default Toast;