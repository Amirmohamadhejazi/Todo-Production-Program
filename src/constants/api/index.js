import axios from "axios";
import {getCookieFunc} from "../HelperFunction";
// import { BASE_URL } from "../index";


const api = axios.create({ baseURL: "http://localhost:5000/api" });

api.interceptors.request.use((cnf) => {
    const tempHeader = cnf.headers || {};
    tempHeader["access-control-allow-origin"] = "*";
    const token = getCookieFunc("token");
    if (token && !tempHeader.Authorization) {
        tempHeader.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    cnf.headers = tempHeader;
    return cnf;
});

api.interceptors.response.use(null, (error) => {
    console.log(error.response, "res");
    console.log(error?.response?.status);
    // console.log("show error")
    if (error?.response?.status === 400){
        console.log("this is 400this is 400this is 400this is 400this is 400this is 400this is 400this is 400")
        console.log(error?.response)
        console.log(error?.response.data.error)
        if (error?.response?.data?.error?.invalid_params){
            // showMessage(error?.response?.data?.error?.invalid_params[0].message,"error")
        }else {
            // showMessage("عملیات ناموفق بود","error")
        }

    }else {
        // showMessage("عملیات ناموفق بود","error")
    }
    return Promise.reject(error);
});

export default api;
