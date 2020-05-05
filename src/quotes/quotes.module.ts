import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';

@Module({
  controllers: [QuotesController],
  imports: [
    TypeOrmModule.forFeature([QuoteEntity])
  ]
})
export class QuotesModule {}
