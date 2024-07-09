import { Role } from "@prisma/client";

export class CurrentUserDto {
    id: number;
    username: string;
    role: Role;
  }
  