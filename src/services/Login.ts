import { API_CONFIG } from "../config/config";
import type { LoginResponse } from "../interfaces/Login.type";
import api from "./api";
import Cookies from "js-cookie";
import axios from "axios";

export const LoginSerivces={
    //Servicio de login
    // Datos a enviar ↓
    login: async (Email: string, Password: string): Promise<LoginResponse> => {
        try{
            console.log("URL ",API_CONFIG.BASE_URL+" url " + API_CONFIG.ENDPOINTS.AUTH.LOGIN);
            console.log("Enviando datos:", { email: Email, password: Password });
            // ↓ espera una resuesta a la solicitud de los datos.
            const response = await api.post<LoginResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                {
                    email:Email,
                    password:Password
                }
            );
            //Si existe un token de llegada se guarda en el encabezado con reglas basicas.
            if(response.data.data?.token){
                Cookies.set('token', response.data.data.token, { expires: 7,secure: true, sameSite: 'strict' });
                return response.data;
            }else{
                return  {
                success: false,
                message: "Token no recibido",
                data: null
            }
        }
            
             
            //Errores de axios para las intercepciones
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as LoginResponse;
            }
            return{
                success: false,
                message: "Error de conexión",
                data: null
            };
        }
        
    }
}