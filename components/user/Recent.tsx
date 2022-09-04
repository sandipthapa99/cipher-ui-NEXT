import TaskCard from "@components/common/TaskCard";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const Recent = () => {
    //for tasks

    const { data: recentTask } = useData<{
        result: Array<{
            id: string;
            category: {
                id: number;
                name: string;
                slug: string;
                icon: string;
            };
            city: {
                id: number;
                name: string;
                country: {
                    id: number;
                    name: string;
                };
            };
            assigner: {
                id: string;
                email: string;
                full_name: string;
                profile_image: string;
            };
            currency: string;
            no_of_applicants: number;
            images: Array<any>;
            videos: Array<any>;
            created_at: string;
            updated_at: string;
            deleted_at: any;
            is_active: boolean;
            status: string;
            title: string;
            description: string;
            requirements: string;
            charge: any;
            location: string;
            estimated_time: number;
            budget_type: string;
            budget_from: number;
            budget_to: number;
            is_onsite: boolean;
            slug: string;
            start_date: string;
            end_date: string;
            start_time: string;
            end_time: string;
            revisions: number;
            no_of_recursion: number;
            extra_data: any;
            is_negotiable: boolean;
            meta_title: any;
            meta_description: any;
            meta_keyword: any;
            assignee: any;
            service: any;
            draft_of: any;
            parent_of: any;
        }>;
    }>(["my-tasks"], "/task/my-task");
    console.log("my-task", recentTask);

    return (
        <div className="recommended-tab">
            <Row>
                {recentTask?.data?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
                        <TaskCard
                            title={task?.title}
                            id={task?.id}
                            charge={task?.charge}
                            description={task?.description}
                            location={task?.location}
                            start_date={task?.start_date}
                            start_time={task?.start_time}
                            status={task?.status}
                            currency={task?.currency}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
