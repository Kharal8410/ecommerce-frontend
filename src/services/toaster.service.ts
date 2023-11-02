import { Toast } from "react-bootstrap"


const config : any={
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
}

export const successTost=(message: string)=>{Toast.success(message,config)}