import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesModule } from './quotes/quotes.module';
import { QuoteEntity } from './quotes/quote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      connectString: process.env.DATABASE_URL,
      ssl: true,
      entities: [QuoteEntity]
    }),
    QuotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
