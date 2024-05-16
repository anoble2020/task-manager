import {Filter, MoreVertical, User} from 'lucide-react';

import './list.css';
import { Helmet } from 'react-helmet';

const Tasks = (props) => {
  return (
    <div className="list-container">
      <Helmet>
        <title>Tasky</title>
      </Helmet>

<h1>Tasks</h1>
<div class="search-filter">
  <input type="text" placeholder="Search tasks..."></input>
  <button class="filter-btn"><Filter color="black" size={30} class="px-2 h-3" /></button>
  <button class="more-btn"><MoreVertical color="black" size={30} class="px-2 h-3" /></button>
</div>
<table class="issues-table">
  <thead>
    <tr>
      <th>Task</th>
      <th>Title</th>
      <th>Project</th>
      <th>Priority</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FIG-123</td>
      <td>Task 1</td>
      <td>Project1</td>
      <td><span class="priority high">High</span></td>
      <td>Dec 5</td>
    </tr>
  </tbody>
</table>
</div>
  )
}

export default Tasks