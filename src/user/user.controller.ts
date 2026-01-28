import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * GET /user
   * Returns all users in the database
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * GET /user/:id
   * Returns a single user by ID
   * @Param id - user ID (auto-parsed as number by ParseIntPipe)
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

    /**
   * GET /user/:id/posts
   * Returns all posts for a specific user by ID
   * @Param id - user ID (auto-parsed as number by ParseIntPipe)
   */
  @Get(':id/posts')
findAllPost(@Param('id', ParseIntPipe) userId: number) {
  return this.userService.findAllPost(userId);
}

  /**
   * POST /user
   * Creates a new user
   * @Body createUserDto - Data for creating a new user
   */
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * PATCH /user/:id
   * Updates an existing user
   * @Param id - user ID to update
   * @Body updateUserDto - Updated data
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * DELETE /user/:id
   * Deletes a user by ID
   * @Param id - user ID to delete
   */
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
