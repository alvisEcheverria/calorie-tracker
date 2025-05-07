import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    state: ActivityState;
    dispatch: Dispatch<ActivityActions>;
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
};

export const Form = ({ state, dispatch } : FormProps) => {

    const [ activity, setActivity ] = useState<Activity>(initialState);

    useEffect(()=> {
        if(state.activeId){
            const selectedActivity = state.activities.filter((stateActivity: Activity) => stateActivity.id === state.activeId)[0];
            setActivity(selectedActivity);
        }
    }, [state.activities, state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement> ): void=> {
        const isNumberField = ["category", "calories"].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField? +e.target.value : e.target.value 
        });
    };

    const isValidActivity = ()=> {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        dispatch({type: "save-activity", payload: {newActivity: activity}});

        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    return ( 
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg" 
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoria:</label>
                <select
                    id="category" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}   
                >
                    {
                        categories.map(category => (
                            <option 
                                value={category.id} 
                                key={category.id}
                            >
                                {category.name}
                            </option>
                    ))}
                </select>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input
                        id="name" 
                        type="text"
                        placeholder="Ej. Patatas"
                        className="border border-slate-300 p-2 rounded-lg"
                        value={activity.name} 
                        onChange={handleChange}   
                    />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias</label>
                    <input
                        id="calories" 
                        type="number"
                        placeholder="Ej. 300 o 500"
                        className="border border-slate-300 p-2 rounded-lg"
                        value={activity.calories}
                        onChange={handleChange}   
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
                    value={activity.category === 1? "Guardar comida" : "Guardar ejercicio"}
                    disabled={!isValidActivity()}
                />
            </div>
        </form>
    )
}
