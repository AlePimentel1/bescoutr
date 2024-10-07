import { create } from 'zustand';

interface MenuState {
    isOpen: boolean;
    isCollapsed: boolean;
    openItems: Set<string>; // Conjunto para manejar múltiples submenús
    toggleOpen: () => void;
    toggleCollapse: () => void;
    toggleItem: (itemValue: string) => void; // Nueva función para alternar submenús
}

export const useMenuStore = create<MenuState>((set) => ({
    isOpen: false,
    isCollapsed: false,
    openItems: new Set(), // Inicializamos el estado de los items abiertos
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    toggleItem: (itemValue) => set((state) => {
        const openItems = new Set(state.openItems);
        if (openItems.has(itemValue)) {
            openItems.delete(itemValue); // Cerrar el item si ya está abierto
        } else {
            openItems.add(itemValue); // Abrir el item si está cerrado
        }
        return { openItems };
    }),
}));
