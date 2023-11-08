/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { config } from "../config"
import { errorToast } from "./toaster.service";

export const postData = async (url: string, data: any) => {
    try {
        const resp = await axios.post(`${config.SERVER_URL}${url}`, data);
        return resp.data;
    } catch (error: any) {
        errorToast(error.response.data.error);
    }
}

export const getData = async (url: string) => {
    try {
        const resp = await axios.get(`${config.SERVER_URL}${url}`);
        return resp.data;
    } catch (error: any) {
        errorToast(error.response.data.error);
    }
}