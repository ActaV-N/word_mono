import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { OauthUser } from "src/auth/dto/oauth_user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService{
  constructor(private readonly prisma: PrismaService){}
  
  // Find user by email. If not exist, create and return
  async findByEmailOrSave(oauthUser: OauthUser): Promise<User> {
    const { email } = oauthUser;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      } 
    })

    if (user) {
      return user;
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: email
      }
    });

    return newUser;
  }

  async updateUser(userId: number, updateUser: Prisma.UserUpdateInput){
    return this.prisma.user.update({
      where:{
        id:userId
      },
      data:updateUser
    })
  }

  async findById(id: number){
    return this.prisma.user.findUnique({
      where:{
        id:id
      }
    })
  }
}