import CategoryCard from "@components/common/CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { Col } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

export interface TaskCategory {
    id: number;
    name: string;
    slug: string;
    icon: string;
}
export const useTaskCategories = () => {
    return useQuery(["all-task-categories"], () =>
        axiosClient
            .get<TaskCategory[]>("/task/cms/task-category/list/")
            .then((response) => response.data)
    );
};
export const ServiceCategories = () => {
    const { data: taskCategories = [] } = useTaskCategories();
    return (
        <div className="es-task-category-list">
            {taskCategories.map((category) => (
                <Col key={category.id}>
                    <h1>TO REMOVE</h1>
                </Col>
            ))}
        </div>
    );
};
