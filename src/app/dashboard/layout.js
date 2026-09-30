import Sidebar from "../../components/ui/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-[calc(100dvh-5.6rem)] min-h-0 overflow-hidden pt-6">
            <Sidebar />

            <main className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}