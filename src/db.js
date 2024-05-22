// db.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const insertTask = async (task) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select();

    if (error) {
      console.error('Error saving task:', error);
      throw error;
    }

    console.log('Task saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error saving task:', error);
    throw error;
  }
};

export const fetchTasks = async (user) => {
    try {
        //const uid = '431b9315-5274-462c-8cd7-3d9925788f58';
console.log('user', user);
      const { data, error } = await supabase
        .from('tasks')
        .select('*, project:projects(name,id)')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  export const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('id, name');
  
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      console.log('projects', data);
  
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };