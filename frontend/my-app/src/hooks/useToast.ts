import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = (message:String,type:any) => toast(message,{type:type,autoClose:3000});


export {notify, ToastContainer};