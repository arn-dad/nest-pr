import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDTO } from './dto/add-role.dto';
import { BlockUserDTO } from './dto/block-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('User Controller')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDTO) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Add new role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDTO) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Block user' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/block')
  blockUser(@Body() dto: BlockUserDTO) {
    return this.userService.blockUser(dto);
  }
}
