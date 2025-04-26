import { UserDetail } from "../models/userdetail";

export interface LoginResponse {
    user: {
        id: string;
        name: string;
        email: string;
        userDetail: UserDetail
    };
    token: string;
    expiresAt: number;
    lastUsed: number;

}