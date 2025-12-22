import {Transaction} from './transaction.type';

export type Account = {
  id: number;
  name: string;
  number: string;
  balance: number;
  transactions: Transaction[];
}
