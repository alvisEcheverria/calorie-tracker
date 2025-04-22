import { categories } from "../data/categories";

export const Form = () => {
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoria:</label>
            <select
                id="category" 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white">
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
                <label htmlFor="activity" className="font-bold">Actividad:</label>
                <input
                    id="activity" 
                    type="text"
                    placeholder="Ej. Patatas"
                    className="border border-slate-300 p-2 rounded-lg" 
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Calorias</label>
                <input
                    id="activity" 
                    type="number"
                    placeholder="Ej. 300 o 500"
                    className="border border-slate-300 p-2 rounded-lg" 
                />
            </div>
            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value="Guardar"
            />
        </div>
    </form>
  )
}
