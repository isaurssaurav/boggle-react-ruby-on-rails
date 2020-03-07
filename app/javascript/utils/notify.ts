import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    position: toast.POSITION.TOP_LEFT,
    transition: Slide,
    hideProgressBar: true
});
function showSuccess(message: string) {
    toast.success(message);
}

function showError(message: string) {
    toast.error(message)
}
export {
    showError,
    showSuccess
}