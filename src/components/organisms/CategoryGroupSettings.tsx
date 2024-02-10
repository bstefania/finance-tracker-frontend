import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import styles from "../../styles/organisms/CategoryGroupSettings.module.scss";
import Button from "../atoms/Button";
import NoData from "../atoms/NoData";
import { categoryGroupsActions } from "../../store/categoryGroupsSlice";
import CategoryGroupMenuItem from "../molecules/CategoryGroupMenuItem";
import CategoryGroupEditor from "./CategoryGroupEditor";

type CategoriesProps = {};

function CategoryGroupSettings({}: CategoriesProps) {
  const dispatch = useAppDispatch();
  const categoryGroups = useAppSelector((state) => state.categoryGroups.entities);
  const status = useAppSelector((state) => state.categoryGroups.status);
  const error = useAppSelector((state) => state.categoryGroups.error);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<string | null>(null);

  useEffect(() => {
    dispatch(categoryGroupsActions.fetchCategoryGroups());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(categoryGroups).length > 0) {
      setSelectedCategoryGroup(Object.keys(categoryGroups)[0]);
    }
  }, [categoryGroups])

  const toggleModal = () => {
    console.log("Modal toggled");
  };

  return (
    <div className={styles["widget"]}>
      <div className={styles["header"]}>
        <h2>Category groups</h2>
        <Button onClick={() => toggleModal()}>+ Add</Button>
      </div>
      <div className={styles["editor"]}>
        <div className={styles["category-groups"]}>
          {Object.entries(categoryGroups).map(([id, categoryGroup]) => (
            <CategoryGroupMenuItem
              key={categoryGroup.id}
              data={categoryGroup}
              selected={selectedCategoryGroup === id}
              onClick={() => setSelectedCategoryGroup(id)}
            />
          ))}
        </div>
        <CategoryGroupEditor id={selectedCategoryGroup} />
      </div>
        {Object.keys(categoryGroups).length === 0 && (
          <NoData
            isLoading={status === "loading"}
            loadingText="Fetching category groups..."
            notFoundText="No category groups found"
          />
        )}
    </div>
  );
}

export default CategoryGroupSettings;
