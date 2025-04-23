
import {SidebarProvider} from '@/components/ui/sidebar';
import ChatInterface from '@/components/ChatInterface';
import SidebarContent from '@/components/SidebarContent';

export default function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <SidebarContent />
        <ChatInterface />
      </div>
    </SidebarProvider>
  );
}
