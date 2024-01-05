import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

interface SideLayoutProps {
  children: React.ReactNode;
}

const SideLayout: React.FC<SideLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <LeftSidebar className="hidden md:flex fixed" />

      <main className="ml-0 md:ml-[249px] h-full flex-1 overflow-y-auto">
        {children}
      </main>

      {/* <RightSidebar /> */}
    </div>
  );
};

export default SideLayout;
