import { Activity } from "../types"

export type ActivityActions = 
    { type: "save-activity", payload: { newActivity: Activity }} |
    { type: "set-activeId", payload:  { id: Activity["id"] }} |
    { type: "remove-activity", payload: { id: Activity["id"] }}

export type ActivityState = {
    activities: Activity[];
    activeId: Activity["id"];
};

const localStorageActivities = ()=>{
    const activities = localStorage.getItem("activities");
    return activities? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ""
};

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    switch (action.type) {
        case "save-activity":
            return {
                ...state,
                activities: state.activeId
                    ? state.activities.map(activity => 
                        activity.id === state.activeId ? action.payload.newActivity : activity)
                    : [...state.activities, action.payload.newActivity],
                activeId: ""
            };
        case "set-activeId":
            return {
                ...state,
                activeId: action.payload.id
            };
        case "remove-activity":
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id),
                activeId: ""
            };
        default:
            return state;
    }
};