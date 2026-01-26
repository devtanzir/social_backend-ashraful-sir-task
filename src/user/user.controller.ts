import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Post()
    create(@Body() data) {
        return this.userService.create(data);
    }
}
