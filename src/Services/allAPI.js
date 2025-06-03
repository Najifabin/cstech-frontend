import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-agent`,reqBody)
}

// upload csv 
export const uploadCsvAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/upload`,reqBody,reqHeader)
}