import { NavbarComponent } from "@/components/navbar";
import { SidebarComponent } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="w-full">
      <NavbarComponent  />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[250px] h-full bg-white">

        <SidebarComponent  />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
