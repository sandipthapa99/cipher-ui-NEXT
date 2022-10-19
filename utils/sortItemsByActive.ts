import type { IService } from "types/service";
import type { ITask } from "types/task";
import type { ITasker } from "types/tasker";

export type SortServicePayload = { type: "service"; services: IService[] };
export type SortTaskerPayload = { type: "tasker"; taskers: ITasker[] };
export type SortTaskPayload = { type: "task"; tasks: ITask[] };

export type Payload = (
    | SortServicePayload
    | SortTaskerPayload
    | SortTaskPayload
) & { activeId: string; onSort?: () => void };

export const sortItemsByActive = <
    TReturnType extends IService | ITask | ITasker
>(
    payload: Payload
): TReturnType[] => {
    if (payload.type === "task") {
        const { tasks, activeId, onSort } = payload;
        const activeTask = [...tasks].find((task) => task.id === activeId);
        const filteredTasks = [...tasks].filter(
            (service) => service.slug !== activeId
        );
        onSort?.();
        return (
            activeTask ? [activeTask, ...filteredTasks] : payload.tasks
        ) as TReturnType[];
    }
    if (payload.type === "service") {
        const { services, activeId, onSort } = payload;
        const activeService = [...services].find(
            (service) => service.slug === activeId
        );

        const filteredServices = [...services].filter(
            (service) => service.slug !== activeId
        );
        onSort?.();
        return (
            activeService
                ? [activeService, ...filteredServices]
                : payload.services
        ) as TReturnType[];
    }
    if (payload.type === "tasker") {
        const { taskers, activeId, onSort } = payload;
        const activeTasker = [...taskers].find(
            (tasker) => tasker?.user?.id === activeId
        );
        const filteredTaskers = [...taskers].filter(
            (tasker) => tasker?.user?.id !== activeId
        );
        onSort?.();
        return (
            activeTasker ? [activeTasker, ...filteredTaskers] : payload.taskers
        ) as TReturnType[];
    }
    return [] as TReturnType[];
};
