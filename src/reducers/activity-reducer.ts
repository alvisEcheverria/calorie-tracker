import { Activity } from "../types"

export type ActivityActions = {
    type: "save-activity";
    payload: { 
        newActivity: Activity 
    };
};

export type ActivityState = {
    activities: Activity[];
};

export const initialState: ActivityState = {
    activities: [],
};

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) =>  {
    
    if(action.type === "save-activity"){
        console.log("este es mi tipo save-activity")
    }

    return state;
};