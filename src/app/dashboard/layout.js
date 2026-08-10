import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="h-[calc(100vh-4.1rem)] flex">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
