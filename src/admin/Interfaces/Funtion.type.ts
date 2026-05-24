export interface CreateFuncionData {
    Name: string;
    Description: string;
    DateFunction: string;
    TimeFunction: string;
    Image?: File;
}
export interface FuncionDataResponse{
    Id: number;
    Name: string;
    Description: string;
    DateFunction: string;
    TimeFunction: string;
    State: boolean;
    ImageUrl: string;
}
export interface CreateFuncionResponse {
    success: boolean;
    message: string;
    data: FuncionDataResponse;
}