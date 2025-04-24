import {SidebarProvider} from '@/components/ui/sidebar';
import ChatInterface from '@/components/ChatInterface';
import SidebarContent from '@/components/SidebarContent';

export default function Home() {
  return (
    <div className='h-full'>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
          <SidebarContent />
          <div className='w-full h-full'>
            <div className='w-full h-full'>
                <ChatInterface />
            </div>
          </div>
          
        </div>
      </SidebarProvider>
    </div>

  );
}
