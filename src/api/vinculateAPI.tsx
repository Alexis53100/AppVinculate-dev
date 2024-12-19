import axios from "axios";

export const vinculateApi  = axios.create({
    baseURL: 'https://vinculate.itesa.edu.mx/seph',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'V23IIUV1'
    }
});

