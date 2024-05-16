import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ListChecks, CircleCheck, Castle, ScrollText } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <aside className="sidebar">
        <span className="logo-container">
          <div className="icon"><ListChecks size={30}/></div>
          <div className="logo-text">Tasky</div>
        </span>
        <nav className="navigation">
          <ul>
            <li><Link to="/"><Castle color="black" size={30} className="px-2 h-3" /> Dashboard</Link></li>
            <li><Link to="/tasks"><CircleCheck color="black" size={30} className="px-2 h-3" /> Tasks</Link></li>
            <li><Link to="/notes"><ScrollText color="black" size={30} className="px-2 h-3" /> Notes</Link></li>
          </ul>
        </nav>
        <div className="settings">
          <Link to="/settings"><i icon-name="settings"></i> Settings</Link>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;