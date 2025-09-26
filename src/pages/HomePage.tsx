import { useSidebarmenuStore } from "../logic/";

export function HomePage() {
    const {routes } = useSidebarmenuStore((state) => state)
    return (
        <main className="ml-4">
            <h1 className="text-xl md:text-2xl mb-4 font-bold">Benvenuto 👋</h1>
            <p className="text-lg md:text-xl">Numero di task aggiunte: {routes.length}</p>
        </main>
    );
}