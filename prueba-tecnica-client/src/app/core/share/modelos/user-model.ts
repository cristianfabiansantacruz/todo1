
export interface UserModel {
    password?: string;
    username?: string;
}

export interface UserSessionModel {
    token: string;
    username: string;
}