import { create } from "zustand"
import { persist } from "zustand/middleware";

// interfaccia per un task generico
interface Task {
    text: string,
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
    addTask: (taskId: string, newTaskName: string) => void,
    completeTask: (taskId: string, taskName: string) => void,
}

export const useSidebarmenuStore = create<SidebarMenuProps>()(
    persist(
        (set) => ({
            routes: [],
            addRoute: (routeText: string) =>
                set((state) => {
                    if (state.routes.some((r) => r.text === routeText)) {
                        alert("Rotta già esistente")
                        return state; 
                    }
                    return {
                    routes: [
                        ...state.routes,
                        {
                        text: routeText,
                        tasks: [],
                        },
                    ],
                    };
                }),
            removeRoute: (taskName: string) => set((state) => ({
                routes: state.routes.filter((task) => task.text !== taskName)
            })),
            addTask: (taskId: string, newTaskName: string) => set((state) => ({
                routes: [
                    ...state.routes.map((route) => {
                        if (route.text == taskId) {
                            if (route.tasks.some((r: Task) => r.text == newTaskName)) {
                                alert("Task già esistente")
                                return route
                            }
                            return {
                                ...route,
                                tasks: [
                                    ...route.tasks,
                                    { text: newTaskName, isCompleted: false },
                                ]
                            }
                        }
                        return route
                    })
                ]
            })),
            completeTask: (taskId: string, taskName: string) => set((state) => ({
                routes: [
                    ...state.routes.map((route) => {
                        if (route.text == taskId) {
                            return {
                                ...route,
                                tasks: route.tasks.map(t => {
                                    if (t.text == taskName) {
                                        t.isCompleted = true
                                    }
                                    return t
                                })
                            }
                        }
                        return route
                    })
                ]
            }))
        }),
        {
            name: "sidebar-menu"
        }
    )
);

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