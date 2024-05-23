import React, { useState, useEffect, useContext } from 'react';
import { fetchPages } from '../db.js';
import { ChevronDown, NotepadText, ChevronRight } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext.js';
import './sidebar.css'; 

const Sidebar = () => {
  const [pages, setPages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPages = async () => {
        let result = await fetchPages(user);
        const pages = result.map(page => ({ ...page, isExpanded: false }));
        setPages(buildHierarchy(pages));
        console.log('pages after set', pages);
    }
    getPages();
  }, [user]);

  const loadPage = (e, pageId) => {
    e.stopPropagation();
    console.log(pageId);
  }

  const buildHierarchy = (pages) => {
    let map = {};
    let roots = [];
    pages.forEach(page => {
      page.nestedPages = [];
      map[page.id] = page;
    });
    console.log("Pages mapped:", map);
    pages.forEach(page => {
      if (page.parent_page) {
        if (map[page.parent_page]) {
          map[page.parent_page].nestedPages.push(page);
        }
      } else {
        roots.push(page);
      }
    });
    console.log("Roots identified:", roots);
    return roots;
  };

  const toggleNestedPages = (e, pageId) => {
    e.stopPropagation();
    const togglePage = (pages) => {
      return pages.map(page => {
        if (page.id === pageId) {
          return { ...page, isExpanded: !page.isExpanded };
        }
        if (page.nestedPages.length > 0) {
          return { ...page, nestedPages: togglePage(page.nestedPages) };
        }
        return page;
      });
    };
    setPages(prevPages => togglePage(prevPages));
  };

  const renderPages = (pages) => (
    pages.map(page => (
      <div key={page.id} style={{ marginBottom: '8px' }}>
        <div
          className="page"
          onClick={(e) => {toggleNestedPages(e, page.id)}}
          onMouseEnter={(e) => {
            if (!page.isExpanded) {
              e.currentTarget.querySelector('.icon-default').style.display = 'none';
              e.currentTarget.querySelector('.icon-chevron-right').style.display = 'inline';
            }
          }}
          onMouseLeave={(e) => {
            if (!page.isExpanded) {
              e.currentTarget.querySelector('.icon-default').style.display = 'inline';
              e.currentTarget.querySelector('.icon-chevron-right').style.display = 'none';
            }
          }}
        >
          <span className="icon-default hover:bg-gray-200" style={{ marginRight: '4px' }}>
            {page.isExpanded ? <ChevronDown size={20} /> : <NotepadText size={18} />}
          </span>
          <span className="icon-chevron-right hover:bg-gray-200 hover:rounded-md" style={{ display: 'none', marginRight: '4px' }}>
            <ChevronRight size={20} />
          </span>
          <span className="page-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }} onClick={(e) => loadPage(e, page.id)}>
            {page.title}
          </span>
        </div>
        {page.isExpanded && page.nestedPages.length > 0 && (
          <div className="nested-pages" style={{ marginLeft: '12px' }}>
            {renderPages(page.nestedPages)}
          </div>
        )}
      </div>
    ))
  );

  return (
    <div className="sidebar">
      {renderPages(pages)}
    </div>
  );
};

export default Sidebar;