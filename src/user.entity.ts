/* eslint-disable prettier/prettier */
export class UserEntity {
  id: string;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  
  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
    this.isActive = this.isActive ?? true;
  }
}