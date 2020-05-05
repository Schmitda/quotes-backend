import { Controller, Get } from '@nestjs/common';
import * as readline from 'readline';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';
import { Repository } from 'typeorm';


@Controller('quotes')
export class QuotesController {
  @InjectRepository(QuoteEntity)
  private quoteEntityRepository: Repository<QuoteEntity>;


  @Get('load-quotes')
  loadQuotes() {
    const readInterface = readline.createInterface({
      input: fs.createReadStream('../quotes.txt'),
      output: process.stdout,
      console: false,
    } as any);
    const quotes: Promise<QuoteEntity>[] = [];
    readInterface.on('line', input => {
      const quote = input.split('"')[1].replace('"', '');
      const from = input.split('"')[2];
      quotes.push(this.quoteEntityRepository.save({ from: from, quote: quote }));
    });
    return new Promise((resolve, reject) => {
      readInterface.on('close', () => {
        Promise.all(quotes).then(quotes => {
          resolve(quotes);
        });
      });
    });
  }

  @Get('get-quote')
  showQuote() {
    return this.quoteEntityRepository.query('select * from quotes ORDER BY random() limit 1');
  }
}
