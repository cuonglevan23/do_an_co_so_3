// import { createContext, useContext, useS
//  } from "react";
// import axios from axios;
// import {toast} from "react-toastify";

// const user = JSON.parse(localStorage.getItem("user"));
// const token = JSON.parse(localStorage.getItem("token"));
// const dark = JSON.parse(localStorage.getItem("dark"));
// const initState = {
//     user: user || "",
//     token: token || "",
//     dark: dark || "",
//     openModal: false,
//     isQrcode: false,
// };

// // @ts-ignore
// const AppContext = createContext();

// const AppProvider = ({children}) => {
//     const [state, setStateContext] = useState(initState);
//     if (state.dark) {
//         document.documentElement.classList.add("dark");
//     } else {
//         document.documentElement.classList.remove("dark");
//     }
// }