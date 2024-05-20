import React from 'react';
import {Home, ListChecks, CircleCheck, Castle, ScrollText} from 'lucide-react';

import { Helmet } from 'react-helmet';

import './list.css';

const List = (props) => {
  return (
    <div className="list-container">
      <Helmet>
        <title>tasky</title>
      </Helmet>
  <div class="container">
    <aside class="sidebar">
    <span class="logo-container">
      <div class="icon"><ListChecks size={30}/></div>
      <div class="logo-text">Tasky</div>
    </span>
      <nav class="navigation">
        <ul>
          <li><a href="#"><Castle color="black" size={30} class="px-2 h-3" /> Dashboard</a></li>
          <li><a href="#/tasks"><CircleCheck color="black" size={30} class="px-2 h-3" /> Tasks</a></li>
          <li><a href="#"><ScrollText color="black" size={30} class="px-2 h-3" /> Notes</a></li>
          <li class="active"><a href="#"><i icon-name="radio"></i> Radio</a></li>
        </ul>
      </nav>
      <div class="settings">
        <a href="#"><i icon-name="settings"></i> Settings</a>
      </div>
    </aside>
    <main class="content">
    </main>
  </div>
  </div>
  )
}

export default List
