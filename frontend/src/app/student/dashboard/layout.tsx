import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import ChatWrapper from "@/components/chat/ChatWrapper";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <Sidebar role="STUDENT" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <TopNavbar role="STUDENT" />
        <main className="flex-1 p-6 md:p-8 space-y-8 container-custom">
          {children}
        </main>
      </div>

      {/* Floating AI Assistant Chatbot */}
      <ChatWrapper />
    </div>
  );
}
