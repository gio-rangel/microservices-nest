import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/common/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { catchError } from 'rxjs';
import { RcpCustomExceptionFilter } from 'src/common/filters/rcp-custom-exception.filter';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy
  ) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsClient.send(
      {cmd: 'create-product'},
      body
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Get('')
  findAll(@Body() body: PaginationDto) {
    return this.productsClient.send(
      {cmd: 'find-products'},
      body
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send(
      {cmd: 'find-product'},
      {id}
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Patch(':id')
  update(@Body() body: UpdateProductDto) {
    return this.productsClient.send(
      {cmd: 'update-product'},
      body
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send(
      {cmd: 'remove-product'},
      {id}
    ).pipe(
      catchError( (err) => {
        throw new RpcException(err)
      })
    );
  }
}
