import React, { useState } from 'react';

export const App = () => {
    const [list, updateList] = useState(["Shopping"]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements[0] as HTMLInputElement;
        if (!input.value.trim()) return;
        updateList([...list, input.value.trim()]);
        input.value = "";
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
            <h1 className="text-gray-800 text-center italic font-bold text-4xl pt-10 xl:text-6xl">
                TO-DO LIST
            </h1>

            {/* Add todo */}
            <form className="mt-8 flex gap-3 w-full max-w-md px-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="New task" className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
                    Add
                </button>
            </form>

            {/* Todo list */}
            <div className="mt-10 w-full max-w-lg bg-slate-200 p-6 rounded-md space-y-4">
                {list.length === 0 && (<div className="text-xl text-center text-gray-600"> Nothing to do! </div>)}

                {list.map((task) => (
                    <div key={task} className="bg-white px-4 py-3 flex justify-between items-center rounded-md">
                        <p className="flex-1 truncate mr-4">{task}</p>
                        <span className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer"
                            onClick={() => {
                                const toRemove = list.indexOf(task);
                                updateList([
                                    ...list.slice(0, toRemove),
                                    ...list.slice(toRemove + 1),
                                ]);
                            }}>X</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
