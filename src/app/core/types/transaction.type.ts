export type Transaction = {
  id: number;
  type: 'DEBIT' | 'CREDIT';
  senderId: number ;
  receiverId: number;
  amount: number;
  dateTime: string;
  note: string | null;
}

export type TransactionForm = {
  senderId: number;
  receiverId: number;
  amount: number;
  note: string | null;
}

