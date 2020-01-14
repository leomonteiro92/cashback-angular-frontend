export interface User {
    _id?: string;
    name: string;
    email: string;
    cpf: string;
    password?: string;
    confirmPassword?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}