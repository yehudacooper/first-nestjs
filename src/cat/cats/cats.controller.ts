import { Controller, Get, Post, Body, UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateCatDto } from '../create-cat.dto';
import { CatsService } from '../cat.service';
import { Cat } from '../cat.interface';
import { JoiValidationPipe } from '../../validation.pipe';
import * as Joi from '@hapi/joi';

import CatSchema from '../cat.schema';
import { RolesGuard } from '../roles.guard';
// import * as Joiful from 'joiful';

let schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().optional()
})

@Controller('cats')
export class CatsController {

    // public schema = Joi.object({
    //     name: Joi.string().required(),
    //     age: Joi.number().optional()
    // })

    constructor(private catsService: CatsService) { }

    @Post()
    @SetMetadata('roles', ['admin'])
    @UseGuards(RolesGuard)
    @UsePipes(new JoiValidationPipe(schema))
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    // @SetMetadata('roles', ['admin'])
    // @UseGuards(RolesGuard)
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}

// class Schema {
//     @Joiful.string().required() // some required string
//     mandatory!: string
//     @Joiful.string().optional() // some optional string
//     optional?: string
//   }

