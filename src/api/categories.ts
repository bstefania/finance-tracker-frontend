import {
  Category,
  CategoryGroup,
  CategoryGroupInput,
  CategoryInput,
} from "../types/database";
import { HttpResponse } from "../types/responses";
import { customAxios } from "./axios";

export const getCategoryGroups = async () => {
  try {
    const res = await customAxios.get("/categoryGroups");
    return res.data.data as CategoryGroup[];
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Category group info not found.");
    } else {
      throw Error("Category group info couldn't be retrieved.");
    }
  }
};

export const postCategoryGroups = async (data: CategoryGroupInput) => {
  try {
    const res = await customAxios.post("/categoryGroups", data);
    return res.data.data as CategoryGroup;
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Categroy group info not found.");
    } else {
      throw Error("Category group info couldn't be created.");
    }
  }
};

export const getCategories = async () => {
  try {
    const res = await customAxios.get("/categories");
    return res.data.data as Category[];
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Category info not found.");
    } else {
      throw Error("Category info couldn't be retrieved.");
    }
  }
}

export const postCategories = async (data: CategoryInput) => {
  try {
    const res = customAxios.post("/categories", data);
    return (await res).data.data as Category;
  } catch (error: any) {
    if (error.status === HttpResponse.NOT_FOUND) {
      throw Error("Categroy info not found.");
    } else {
      throw Error("Category info couldn't be created.");
    }
  }
};
