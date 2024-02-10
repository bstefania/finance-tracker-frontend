import { useEffect } from "react";
import styles from "../../styles/organisms/CategoryGroupEditor.module.scss";
import { Category } from "../../types/database";
import Icon from "../atoms/Icon";
import Label from "../atoms/Label";
import CategoryEditor from "../molecules/CategoryEditor";
import { categoriesActions, selectCategoriesByGroup } from "../../store/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import Button from "../atoms/Button";
import NoData from "../atoms/NoData";

type CategoryGroupEditorProps = {
  id: string | null;
};

const CategoryGroupEditor = ({ id }: CategoryGroupEditorProps) => {
  const dispatch = useAppDispatch();
  // filtered by category group
  const categories = useAppSelector((state) => selectCategoriesByGroup(state.categories, id));
  const status = useAppSelector((state) => state.categories.status);

  useEffect(() => {
    if (!id) return;

    dispatch(categoriesActions.fetchCategories());
  }, [id, dispatch]);

  function toggleModal(): void {}

  return (
    <div className={styles["editor"]}>
      <div className={styles["details"]}>
        <div className={styles["header"]}>
          <h3>Details</h3>
          <Button tertiary icon="ellipsis-vertical" />
        </div>
        <div className={styles["info-list"]}>
          <div className={styles["info"]}>
            <span className={styles["label"]}>Accepted transaction types</span>
            <div className={styles["value"]}>
              <Label transactionType="income">income</Label>
              <Label transactionType="expense">expense</Label>
              <Label transactionType="savings">savings</Label>
            </div>
          </div>
          <div className={styles["info"]}>
            <span className={styles["label"]}>Shared with</span>
            <Icon icon="circle-user" large />
          </div>
        </div>
      </div>
      <div className={styles["categories"]}>
        <div className={styles["header"]}>
          <h3>Categories</h3>
          <Button tertiary icon="plus" onClick={() => toggleModal()} />
        </div>
        <div className={`${styles["category-list"]} no-scrollbar`}>
          {Object.entries(categories).map(([id, category]) => (
            <CategoryEditor key={category.id} data={category} />
          ))}
        </div>
        {Object.keys(categories).length === 0 && (
          <NoData
            isLoading={status === "loading"}
            loadingText="Fetching categories..."
            notFoundText="No categories found"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryGroupEditor;
