export interface loginData {
    email: string,
    token: string,
    rol: string
}

export interface LoginResponse {
    success: boolean,
    message: string,
    data: loginData |null
}
