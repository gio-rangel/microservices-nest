import { Controller, Get, Post, Body, Patch, Param, Query, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/common/constants';
import { catchError } from 'rxjs';

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
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
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
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(
      {cmd: 'find-order'},
      { id }
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Patch(':id')
  update(@Body() body: UpdateOrderDto) {
    return this.ordersClient.send(
      {cmd: 'change-order-status'},
      body
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }
}
