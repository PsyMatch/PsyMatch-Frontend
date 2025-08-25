export const triggerAuthStateChange = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('authStateChange'));
    }
};