import Category from 'shared/models/category.model';
const categories: Category[] = [
  {
    id: 1,
    group_id: 1,
    name: "Test Category 1",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 2,
    group_id: 1,
    name: "Test Category 2",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 3,
    group_id: 2,
    name: "Test Category 3",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 4,
    group_id: 1,
    name: "Test Category 4",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 5,
    group_id: 2,
    name: "Test Category 5",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 6,
    group_id: 3,
    name: "Test Category 6",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 7,
    group_id: 4,
    name: "Test Category 7",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category,
  {
    id: 8,
    group_id: 5,
    name: "Test Category 8",
    assigned: new Map([
      ["key1", 1],
      ["key2", 1]
  ]),
    notes: "Test notes",
    created_at: new Date()
  } as Category
] as Category[];

export default categories;
