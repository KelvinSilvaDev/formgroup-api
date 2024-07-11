import { Role } from "src/common/roles.enum";


export interface UserPayload {
  sub: number;         // ID do usuário
  email: string;      // Email do usuário
  username: string;   // Nome de usuário
  role: Role;         // Papel do usuário
  iat?: number;       // Data de criação do token
  exp?: number;       // Data de expiração do token
}
