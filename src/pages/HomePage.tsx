import { useSidebarmenuStore } from "../logic/";

export function HomePage() {
    const {routes } = useSidebarmenuStore((state) => state)

    function count() {
        let importantTask: number = 0
        let notImportantTask: number = 0
        routes.map(route => {
            route.tasks.map(task => {
                if (task.importance == "Not important") {
                    notImportantTask++
                } else {
                    importantTask++
                }
            })
        })

        return [notImportantTask, importantTask]
    }
    return (
        <main className="ml-4">
            <h1 className="text-xl md:text-2xl mb-4 font-bold mb-4">Benvenuto 👋</h1>
            <p className="text-lg md:text-xl">Numero di task aggiunte: {routes.length}</p>
            <p className="text-lg md:text-xl my-4">Numero di task non importanti: {count()[0]}</p>
            <p className="text-lg md:text-xl">Numero di task importanti: {count()[1]}</p>
        </main>
    );
}