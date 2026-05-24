import { API_CONFIG } from "../../config/config";
import type { CreateFuncionData, CreateFuncionResponse, FuncionDataResponse } from "../Interfaces/Funtion.type";
import api from "../../services/api";
import axios from "axios";

export const FuncionServices={
    
    Create: async (data: CreateFuncionData ): Promise<CreateFuncionResponse> => {
        try {
            const formData = new FormData();
            formData.append('name', data.Name);
            formData.append('description', data.Description);
            formData.append('dateFunction', data.DateFunction);
            formData.append('timeFunction', data.TimeFunction);
            if (data.Image) {
                formData.append('image', data.Image);
            }

            const response = await api.post<CreateFuncionResponse>(
                API_CONFIG.ENDPOINTS.FUNTION.CREATE,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as CreateFuncionResponse;
            }
            return {
                success: false,
                message: "Error de conexión",
                data: null as unknown as FuncionDataResponse
            };
        }
    }
}