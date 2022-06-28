import Record from '../../models/record.model';
const mockRecords: Record[] = [
  {
    id: 1,
    account_id: 1,
    category_id: 1,
    date: createOffsetMonth(0),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 10.00,
    created_at: new Date()
  } as Record,
  {
    id: 2,
    account_id: 1,
    category_id: 2,
    date: createOffsetMonth(0),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 150.00,
    created_at: new Date()
  } as Record,
  {
    id: 3,
    account_id: 1,
    category_id: 1,
    date: createOffsetMonth(1),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 50.00,
    created_at: new Date()
  } as Record,
  {
    id: 4,
    account_id: 2,
    category_id: 8,
    date: createOffsetMonth(2),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 1500,
    created_at: new Date()
  } as Record,
  {
    id: 5,
    account_id: 1,
    category_id: 1,
    date: createOffsetMonth(3),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 100.00,
    created_at: new Date()
  } as Record
];

export default mockRecords;

function createOffsetMonth(offset: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - offset);
  return date;
}

