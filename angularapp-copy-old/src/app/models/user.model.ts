export class User {
    userId?: number;
    email: String;
    password: string;
    username: string;
    mobileNumber: string;
    userRole: string;
    constructor(
        email: String,
        password: string,
        username: string,
        mobileNumber: string,
        userRole: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;

    }
}