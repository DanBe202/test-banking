export type Transaction = {
  id: number;
  senderId: number ;
  receiverId: number;
  amount: number;
  note: string | null;
}
