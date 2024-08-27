'use client'
import Header from "@/components/header/Header";
import SideNav from "@/components/side-nav/SideNav";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FlexibleLayoutProps {
    fixedContent?: React.ReactNode;
    children: React.ReactNode;
    fixedClassName?: string;
    childrenClassName?: string
    withoutSideNav?: boolean;
}

const FlexibleLayout: React.FC<FlexibleLayoutProps> = ({
    fixedContent,
    children,
    fixedClassName,
    childrenClassName,
    withoutSideNav = false
}) => {
    const [totalHeight, setTotalHeight] = useState(0);;

    useEffect(() => {
        const updateHeight = () => {
            const mobileNavHeight = document.getElementById('mobile-nav')?.clientHeight || 0;
            setTotalHeight(mobileNavHeight);
        };

        // Actualiza la altura cuando se monta el componente
        updateHeight();

        // Escucha los cambios de tamaño de la ventana
        window.addEventListener('resize', updateHeight);

        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {!withoutSideNav && (
                <SideNav />
            )}
            <div className="flex-1 flex flex-col h-screen" style={{ height: `calc(100vh - ${totalHeight}px)` }}>
                <Header />
                <div className="flex-1 flex overflow-hidden">
                    <main className={cn("flex-grow col-span-2 overflow-auto px-4 overflow-y-auto", childrenClassName)} style={{ scrollbarWidth: 'none' }}>
                        {children}
                    </main>
                    {fixedContent && (
                        <aside className={cn("flex-shrink-0 col-span-1", fixedClassName)} style={{ scrollbarWidth: 'none' }}>
                            {fixedContent}
                        </aside>
                    )}
                </div>
            </div>
        </div >
    )
}

export default FlexibleLayout;