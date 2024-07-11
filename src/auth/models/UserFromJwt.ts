import { Role } from "@prisma/client";

export interface UserFromJwt {
  id: number;
  email: string;
  username: string;
  role: Role;
}
