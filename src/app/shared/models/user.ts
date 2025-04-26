import { UserDetail } from "./userdetail";

export class User {
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    token!: string;
    userDetail!: UserDetail;
    expiresAt!: number; // in milliseconds
    lastUsedAt!: number; // in milliseconds
}