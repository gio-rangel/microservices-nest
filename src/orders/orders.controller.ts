import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/common/constants';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly ordersClient: ClientProxy
  ) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.ordersClient.send(
      {cmd: 'create-orders'},
      body
    );
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ordersClient.send(
      {cmd: 'find-orders'},
      { 
        page: page ? +page : 1 , 
        limit: limit ? limit : 5
      }
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(
      {cmd: 'find-order'},
      { id }
    );
  }

  @Patch(':id')
  update(@Body() body: UpdateOrderDto) {
    return this.ordersClient.send(
      {cmd: 'change-order-status'},
      body
    );
  }
}
