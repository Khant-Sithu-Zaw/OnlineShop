export interface IUserLogin {
    //they are all required fields
    email: string;
    password: string;
    remember_me: boolean;
    // true or false
}