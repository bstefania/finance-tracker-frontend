export enum moneyCardType {
  Income = "income",
  Savings = "savings",
  Investments = "investments",
  Credit = "credit"
}

export enum TransactionType {
  Income = "income",
  Expense = "expense",
  Savings = "savings",
  Investments = "investments",
  Credit = "credit"
}

export type BaseWealth = {
  income?: number,
  savings?: number,
  investments?: number
  credit?: number
}

export enum TransactionSource {
  Income = "income",
  Savings = "savings",
  Investments = "investments"
}

type WealthCategory = {
  value: number,
  percentage: number
}

export type Wealth = {
  total: number,
  category: {
    income: WealthCategory,
    savings: WealthCategory,
    investments: WealthCategory
    credit: WealthCategory
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
  color: string,
  categoryGroup: CategoryGroup,
  owner: User,
  sharedWith: User[],
}

export enum IncomeSourceTypes {
  Active = 'active',
  Passive = 'passive'
}

export enum Recurrence {
  Daily = 'daily',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
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