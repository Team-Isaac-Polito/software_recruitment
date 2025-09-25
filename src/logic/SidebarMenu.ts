import { create } from "zustand"

// interfaccia per un task generico
interface Task {
    text: string,
    id: string,
    isCompleted: boolean
}

// interfaccia per la voce laterale del menù
interface MyRoute {
    text: string,
    tasks: Task[],
}

// interfacciA la sidebar completa di tutte le tasks
export interface SidebarMenuProps {
  routes: MyRoute[],
  addRoute: (taskText: string) => void,
  removeRoute: (taskId: string) => void,
}

export const useSidebarmenuStore = create<SidebarMenuProps>()((set) => ({
  routes: [],
  addRoute: (taskText: string) => set((state) => ({
        ...state,
        routes: [
            ...state.routes,
            {
                text: taskText,
                tasks: []
            }
        ]
    })),
    removeRoute: (taskName: string) => set((state) => ({
        routes: state.routes.filter((task) => task.text !== taskName)
    })),
}));

/*
    sidebarMenuTasks = [
        {
            icon: Home,
            text: Home,
            tasks: [
                {
                    "Name",
                    "isCompleted"
                }
            ]
        },
        {
            icon: Second,
            text: Second,
            tasks: [
                {
                    "Name",
                    "isCompleted"
                }
            ]
        }
    ]
*/