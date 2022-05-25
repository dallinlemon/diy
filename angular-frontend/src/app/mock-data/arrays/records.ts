import Record from 'shared/models/record.model';
const mockRecords: Record[] = [
  {
    id: 1,
    account_id: 1,
    category_id: 1,
    date: new Date(),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 10.00,
    created_at: new Date()
  } as Record,
  {
    id: 2,
    account_id: 1,
    category_id: 2,
    date: new Date(),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 150.00,
    created_at: new Date()
  } as Record,
  {
    id: 3,
    account_id: 1,
    category_id: 1,
    date: new Date(),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 50.00,
    created_at: new Date()
  } as Record,
  {
    id: 4,
    account_id: 2,
    category_id: 8,
    date: new Date(),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 1500,
    created_at: new Date()
  } as Record,
  {
    id: 5,
    account_id: 1,
    category_id: 1,
    date: new Date(),
    payee: "Test Payee",
    memo: "Test Memo",
    amount: 100.00,
    created_at: new Date()
  } as Record
];

export default mockRecords;
