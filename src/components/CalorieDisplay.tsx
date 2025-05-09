type CalorieDisplayProp = {
    calories: number;
    description: string;
}

export const CalorieDisplay = ({ calories, description }: CalorieDisplayProp) => {
    return (
        <p className="text-white font-bold rounded-full grid gird-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange">{calories}</span>
            {description}
        </p>
    )
}
