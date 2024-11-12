import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.MS_PRODUCT_HOST,
          port: Number(process.env.MS_PRODUCT_PORT)
        }
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
