import { Role } from "@prisma/client";



export class User {
    id?: number;
    email: string;
    password: string;
    username: string;
    role: Role;
    isActive: boolean;
}  