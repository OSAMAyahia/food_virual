import { toast } from "react-toastify";

export const showToast = (isSuccess) => {
    if (isSuccess) {
      toast.success('Success', {
        position: "top-right",
        autoClose: 1500,
       
      });
    } else {
      toast.error('fail', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };