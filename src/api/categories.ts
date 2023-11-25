import {
  Category,
  CategoryGroup,
  CategoryGroupInput,
  CategoryInput,
} from "../types/database";
import { customAxios } from "./axios";

export const getCategoryGroups = async () => {
  try {
    const res = await customAxios.get("/categoryGroups");
    return res.data.data as CategoryGroup[];
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Category groups couldn't be retrieved!"
    );
  }
};

export const postCategoryGroups = async (data: CategoryGroupInput) => {
  try {
    const res = await customAxios.post("/categoryGroups", data);
    return res.data.data as CategoryGroup;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Category group couldn't be created!"
    );
  }
};

export const getCategories = async () => {
  try {
    const res = await customAxios.get("/categories");
    return res.data.data as Category[];
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Categories couldn't be retrieved!"
    );
  }
};

export const postCategories = async (data: CategoryInput) => {
  try {
    const res = await customAxios.post("/categories", data);
    return res.data.data as Category;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ?? "Category couldn't be created!"
    );
  }
};
