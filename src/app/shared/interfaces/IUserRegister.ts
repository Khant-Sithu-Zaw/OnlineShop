export interface IUserRegister {
    //they are all required fields
    name: string;
    email: string;
    password: string;
    phone: string;
    profileImage?: File; // optional field
}