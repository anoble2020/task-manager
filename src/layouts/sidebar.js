import React, { useState, useEffect } from 'react';
import { fetchPages } from '../db.js';
import { ChevronDown, NotepadText, ChevronRight } from 'lucide-react';


const Sidebar = ({user}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = async () => {
        let pages = await fetchPages(user);
        
        setPages(pages);
    }
    getPages();
  }, []);

  const toggleNestedPages = (index) => {
    const updatedPages = [...pages];
    updatedPages[index].isExpanded = !updatedPages[index].isExpanded;
    setPages(updatedPages);
  };

  return (
    <div className="sidebar">
      {pages.map((page, index) => (
        <div key={index}>
          <div className="page" onClick={() => toggleNestedPages(index)}>
            {page.isExpanded ? <ChevronDown /> : <ChevronRight />}
            <NotepadText />
            {page.title}
          </div>
          {page.isExpanded && page.nestedPages.map((nestedPage, nestedIndex) => (
            <div key={nestedIndex} className="nested-page">
              <NotepadText />
              {nestedPage.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;