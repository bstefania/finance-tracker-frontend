export enum MoneyCardType {
  Income = "income",
  Savings = "savings",
  Investments = "investments",
}

export enum TransactionType {
  Income = "income",
  Expense = "expense",
  Savings = "savings",
  Investments = "investments",
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
  source: TransactionSource,
  createdAt: Date,
  note: string | null,
  sharedWith: string[]
}

export type Transaction = {
  id: string,
  category: Category,
  type: TransactionType,
  source: TransactionSource,
  amount: number,
  createdAt: string | Date,
  note: string,
  owner: User,
  sharedWith: User[];
} 

export type CategoryGroupInput = {
  name: string,
  color: string,
  icon: string,
  sharedWith: string[],
}

export type CategoryGroup = {
  id: string,
  name: string,
  owner: User,
  color: string,
  icon: string,
  sharedWith: User[],
}

export type CategoryInput = {
  name: string,
  color: string,
  icon: string,
  categoryGroupId: string | undefined,
  sharedWith: string[],
}

export type Category = {
  id: string,
  name: string,
  color: string,
  icon: string,
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