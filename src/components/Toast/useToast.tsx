export const useToast = () => {
    const toast = (message: string , type: 'success' | 'info' | 'error' | 'warning' = 'info', duration = 5000) => {
        const event = new CustomEvent('show-toast', {
            detail: {
                message,
                type,
                duration
            }
        });

        window.dispatchEvent(event); // dispatch the event globally
    };

    return {
        success: (message: string , duration?: number) => toast(message,'success',duration),
        error: (message: string , duration?: number) => toast(message,'error',duration),
        warning: (message: string , duration?: number) => toast(message,'warning',duration),
        info: (message: string , duration?: number) => toast(message,'info',duration)
    }
}