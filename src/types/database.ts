export enum TransactionType {
  Income = "Income",
  Expense = "Expense",
  Savings = "Savings",
  Investments = "Investments",
  Credit = "Credit"
}

type WealthCategory = {
  value: number,
  percentage: number
}

export type Wealth = {
  total: number,
  category: {
    wallet: WealthCategory,
    savings: WealthCategory,
    investments: WealthCategory
  }
}

export type User = {
  id: string,
  name: string,
  email: string
} 

export type TransactionInput = {
  categoryId: string,
  type: TransactionType,
  amount: number,
  createdAt: Date,
  note: string,
  sharedWith: string[]
} 

export type Transaction = {
  id: string,
  category: Category,
  type: TransactionType,
  amount: number,
  createdAt: string | Date,
  note: string,
  owner: User,
  sharedWith: User[];
} 

export type CategoryGroupInput = {
  name: string,
  sharedWith: string[],
}

export type CategoryGroup = {
  id: string,
  name: string,
  owner: User,
  sharedWith: User[],
}

export type CategoryInput = {
  name: string,
  categoryGroupId: string,
  sharedWith: string[],
}

export type Category = {
  id: string,
  name: string,
  categoryGroup: CategoryGroup,
  owner: User,
  sharedWith: User[],
}

export enum IncomeSourceTypes {
  Active = 'Active',
  Passive = 'Passive'
}

export enum Recurrence {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly'
} 

export type IncomeSource = {
  id: string,
  category: Category,
  name: string,
  amount: number,
  type: IncomeSourceTypes,
  recurrence: Recurrence,
  payDay: string,
  sharedWith: User[]
}