import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


// ToastOptions
export const showNotification = (data) => { 

    

      if (data.success===true){
        toast.success(data.message, {
          autoClose: 1000,
        });
      }
      else {
        toast.error(data.message, {
          autoClose: 1000,
        }); 
  
      }

};