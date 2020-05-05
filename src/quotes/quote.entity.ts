import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'quotes'})
export class QuoteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;


  @Column()
  from: string;

}
