import Category from '../../models/category.model';
const categories: Category[] = [
  new Category(
    1,
    1,
    "Test Category 1",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes 1",
  ),
  new Category(
    2,
    1,
    "Test Category 2",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    3,
    2,
    "Test Category 3",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    4,
    1,
    "Test Category 4",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    5,
    2,
    "Test Category 5",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    6,
    3,
    "Test Category 6",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    7,
    4,
    "Test Category 6",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
  new Category(
    8,
    5,
    "Test Category 8",
    new Map([
      ["7/2022", 1],
      ["5/2022", 1]
    ]),
    new Date(),
    "Test notes",
  ),
] as Category[];

export default categories;
