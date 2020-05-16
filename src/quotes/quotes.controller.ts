import { Controller, Get } from '@nestjs/common';
import * as readline from 'readline';
import * as fs from 'fs';
import { QuoteEntity } from './quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  @InjectRepository(QuoteEntity)
  private quoteEntityRepository: Repository<QuoteEntity>;


  @Get('load-quotes')
  async loadQuotes() {
    await this.quoteEntityRepository.query("DELETE from quotes");
    const readInterface = readline.createInterface({
      input: fs.createReadStream(__dirname + '/../quotes.txt'),
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
    return this.quoteEntityRepository.query('select * from quotes ORDER BY random() limit 1')[0];
  }
}
