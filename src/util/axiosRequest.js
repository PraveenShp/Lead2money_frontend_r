import axios from "axios";
import { BASE_URL, BASE_NODE_URL, COMMON_API_BASE_URL } from "./globle_constant";

export const axiosRequest = (method, path, data={}) => {

    return new Promise(async (resolve, reject) => {

        const apiurl = (node) ? BASE_NODE_URL : ((common) ? COMMON_API_BASE_URL : BASE_URL);
        const url = `${apiurl}${path}`;

        let headers = {
            'Content-Type': 'multipart/form-data'
        };

        axios({
            method: method,
            url: url,
            headers: headers,
            data: data,
        }).then(response => {
            resolve(response.data); // Resolve with the response data
        }).catch(error => {
            reject(error);
        });
    });
};

export const fetchSeoData = async (resolvedUrl) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: `${BASE_URL}page-tag`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                slug:resolvedUrl
            }
        }).then(response => {
            resolve(response.data); // Resolve with the response data
        }).catch(error => {
            resolve({
                new_url : "",
                data :  "eyJ0aXRsZSI6IiAiLCJkZXNjcmlwdGlvbiI6IiAiLCJrZXl3b3JkcyI6IiAiLCJvZ191cmwiOiIgIiwib2dfdGl0bGUiOiIgIiwib2dfZGVzY3JpcHRpb24iOiIgIiwib2dfaW1hZ2UiOiIgIiwidHdpdHRlcl9jYXJkIjoiICIsInR3aXR0ZXJfY3JlYXRvciI6IiAiLCJ0d2l0dGVyX3VybCI6IiAiLCJ0d2l0dGVyX3RpdGxlIjoiICIsInR3aXR0ZXJfZGVzY3JpcHRpb24iOiIgIiwidHdpdHRlcl9pbWFnZSI6IiAiLCJjYW5vbmljYWxfbGluayI6IiAiLCJtZXRhX2Rlc2NyaXB0aW9uIjoiICIsInJvYm90cyI6IiAiLCJvZ190eXBlIjoiICIsIm9nX2xvY2FsZSI6IiAiLCJvZ19zaXRlX25hbWUiOiIgIn0=",
                curr_time : "",
                faq_data : "",
            });
            //reject(error); // Reject with the error
        });
    });
};


export const fetchServerData = async (method,path,data={},other={}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${BASE_URL}${path}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        }).then(response => {
            resolve(response.data); // Resolve with the response data
        }).catch(error => {
            reject(error); // Reject with the error
        });
    });
};


export const axiosFullUrlRequest = (method, url, data={},other={}) => {
    return new Promise((resolve, reject) => {

        let json    = (other.json) ? other.json : false;

        let headers = {
            'Content-Type': 'multipart/form-data'
        };

        if(json){
            headers['Content-Type'] = 'application/json';
        }

        axios({
            method: method,
            url: url,
            headers: headers,
            data: data
        }).then(response => {
            resolve(response.data); // Resolve with the response data
        }).catch(error => {
            reject(error); // Reject with the error
        });
    });
};


export const axiosNodeRequest = (method, url, token=false) => {
    return new Promise((resolve, reject) => {

        const headers = {
            /* 'Content-Type': 'application/json' */
            'Content-Type': 'multipart/form-data'
        };

        if(token){
            headers['Authorization'] = 'Bearer your_token';
        }

        axios({
            method: method,
            url: url,
            headers: headers
        }).then(response => {
            resolve(response.data); // Resolve with the response data
        }).catch(error => {
            reject(error); // Reject with the error
        });
    });
};
