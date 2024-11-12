import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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
    );
  }

  @Get('')
  findAll(@Body() body: PaginationDto) {
    return this.productsClient.send(
      {cmd: 'find-products'},
      body
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send(
      {cmd: 'find-product'},
      {id}
    );
  }

  @Patch(':id')
  update(@Body() body: UpdateProductDto) {
    return this.productsClient.send(
      {cmd: 'update-product'},
      body
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send(
      {cmd: 'remove-product'},
      {id}
    );
  }
}
