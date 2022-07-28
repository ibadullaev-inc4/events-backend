import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventsDto } from "./create-events.dto";
import { UpdateEventsDto } from "./update-events.dto";
import { Event } from "./event.entity"
import { Like, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/events')
export class EventsController {

    constructor( 
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ) {}


    @Get()
    async findAll() {
        return await this.repository.find();
    }


    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id','when'],
            where: [{
                id: MoreThan(2),
                when: MoreThan(new Date('2021-02-11T13:00:00'))
            },
            {
                description: Like('aaaaaaaaaaaaaaaaaaaaaaaaaaaa%')
            }
        ],
        //limit 2
        take: 2,
        order: {
            id: 'DESC'
        }
        })
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.repository.findOne(id)
    }

    @Post()
    async create(@Body() input: CreateEventsDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when) })
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventsDto) {
        const event = await this.repository.findOne(id)
        return await this.repository.save( {
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when })
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id)
        await this.repository.remove(event)
    }
}