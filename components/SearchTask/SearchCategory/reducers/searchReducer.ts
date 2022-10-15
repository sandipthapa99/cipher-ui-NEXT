export enum ActionKind {
    ADD = "ADD",
    REMOVE = "REMOVE",
    CLEAR = "CLEAR",
}
export interface AddAction {
    type: ActionKind.ADD;
    payload: { key: string; value: string };
}
export interface RemoveAction {
    type: ActionKind.REMOVE;
    payload: { key: string };
}
export interface ClearAction {
    type: ActionKind.CLEAR;
}

export type Action = AddAction | RemoveAction | ClearAction;

export const searchReducer = (
    state: Record<string, string>,
    action: Action
) => {
    switch (action.type) {
        case ActionKind.ADD:
            return { ...state, [action.payload.key]: action.payload.value };
        case ActionKind.REMOVE:
            return Object.entries(state).reduce((acc, curr) => {
                const [key, value] = curr;
                if (key !== action.payload.key) acc[key] = value;
                return acc;
            }, {} as Record<string, string>);
        case ActionKind.CLEAR:
            return {};
        default:
            return state;
    }
};
