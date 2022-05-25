import Group from "shared/models/group.model";

const groups: Group[] = [
  {
    id: 1,
    budget_id: 1,
    name: "Test Group 1",
    notes: "",
    created_at: new Date()
  } as Group,
  {
    id: 2,
    budget_id: 1,
    name: "Test Group 2",
    notes: "",
    created_at: new Date()
  } as Group,
  {
    id: 3,
    budget_id: 1,
    name: "Test Group 3",
    notes: "",
    created_at: new Date()
  } as Group,
  {
    id: 4,
    budget_id: 2,
    name: "Test Group 4",
    notes: "",
    created_at: new Date()
  } as Group,
  {
    id: 5,
    budget_id: 1,
    name: "Test Group 5",
    notes: "",
    created_at: new Date()
  } as Group
];

export default groups;
