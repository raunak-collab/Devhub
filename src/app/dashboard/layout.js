import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="mt-6 flex">
            <Sidebar />
            <main className="flex-1 min-h-[calc(100vh-4.1rem)] overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
        