import { Injectable } from '@nestjs/common';

interface User {
  dni: number;
  nombre: string;
  apellido: string;
  edad: number;
}

@Injectable()
export class UsersService {
  private userList: User[] = [];
  private id = 0;

  getUsers(): User[] {
    return this.userList;
  }

  createUser(user: User): User {
    this.id++;
    const userInser = { dni: this.id, ...user };
    this.userList.push(userInser);
    return userInser;
  }

  modifyUser(dni: number, user: User): User {
    const index = this.userList.findIndex((e: User) => e.dni === dni);
    const modifiedUser = { dni, ...user };
    this.userList[index] = modifiedUser;
    return modifiedUser;
  }

  delete(dni: number): void {
    this.userList = this.userList.filter((e) => e.dni !== dni);
  }
}
