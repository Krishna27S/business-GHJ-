import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-16"> {/* ml-16 to offset the fixed sidebar width */}
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;