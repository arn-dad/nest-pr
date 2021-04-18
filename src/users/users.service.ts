import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/add-role.dto';
import { BlockUserDTO } from './dto/block-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDTO) {
    const user = await this.userRepository.create(userDto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async addRole(dto: AddRoleDTO) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.vale);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async blockUser(dto: BlockUserDTO) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (user) {
      user.banned = true;
      user.banReasons = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
