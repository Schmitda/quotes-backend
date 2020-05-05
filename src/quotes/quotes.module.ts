import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';
import * as PostgressConnectionStringParser from 'pg-connection-string';


const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);


console.log(connectionOptions);

@Module({
  controllers: [QuotesController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: connectionOptions.application_name,
      host: connectionOptions.host,
      port: +connectionOptions.port,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      synchronize: true,
      entities: [QuoteEntity],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        }
      },
    }),
    TypeOrmModule.forFeature([QuoteEntity]),
  ],
})
export class QuotesModule {
}
