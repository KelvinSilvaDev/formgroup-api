import { Role } from "src/common/roles.enum";


export class User {
    id?: number;
    email: string;
    password: string;
    username: string;
    role: Role;
    isActive: boolean;
}  