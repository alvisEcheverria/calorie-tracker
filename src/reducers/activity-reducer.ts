import { Activity } from "../types"

export type ActivityActions = 
    { type: "save-activity", payload: { newActivity: Activity }} |
    { type: "set-activeId", payload:  { id: Activity["id"] }};

export type ActivityState = {
    activities: Activity[];
    activeId: Activity["id"];
};

export const initialState: ActivityState = {
    activities: [],
    activeId: ""
};

type ActionHandlers = {
    [Key in ActivityActions['type']]: (
        state: ActivityState,
        action: Extract<ActivityActions, { type: Key }>
    ) => ActivityState;
};

const actionHandlers: ActionHandlers = {
    "save-activity": (state, action) => ({
        ...state,
        activities: [...state.activities, action.payload.newActivity]
    }),
    "set-activeId": (state, action) => ({
        ...state,
        activeId: action.payload.id
    }),
};

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};