import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { getFromStorage } from '../../utils/storage';
import { useEffect } from 'react';

function ListPage(props) {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');
  const odisUser = getFromStorage('odis-user');

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="tasks-container">
      <div className="task-container">
        {taskList.map(task => {
          return (
            <div className="task" key={task._id}>
              <div
                className="task-description"
                style={{ textDecoration: task.finished ? 'line-through' : '' }}
              >
                {task.description}
              </div>
              <div id="done" className="action" onClick={() => markTask(task)}>
                ✓
              </div>
              <div
                id="delete"
                className="action"
                onClick={() => removeTask(task)}
              >
                -
              </div>
            </div>
          );
        })}
        <input
          value={task}
          type="text"
          placeholder="task description"
          onChange={onChangeTask}
        />
        <div id="add" className="action" onClick={addTask}>
          +
        </div>
      </div>
    </div>
  );

  function onChangeTask(e) {
    setTask(e.target.value);
  }

  function getTasks() {
    if (props.isSecure) {
      axios
        .post('/api/tasks/', odisUser)
        .then(res => {
          setTaskList(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .get('/api/tasks/?userid=' +
            odisUser._id
        )
        .then(res => {
          setTaskList(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function addTask() {
    if (task) {
      const newTask = {
        userid: odisUser._id,
        description: task
      };

      axios
        .post('/api/tasks/add', newTask)
        .then(res => {
          setTask('');
          const updatedTaskList = JSON.parse(JSON.stringify(taskList));
          updatedTaskList.push(res.data);
          setTaskList(updatedTaskList);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function removeTask(task) {
    axios
      .delete('/api/tasks/' + task._id)
      .then(res => {
        const updatedTaskList = JSON.parse(JSON.stringify(taskList)).filter(
          task => task._id !== res.data
        );
        setTaskList(updatedTaskList);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function markTask(task) {
    axios
      .post('/api/tasks/update/' + task._id, {
        finished: !task.finished
      })
      .then(res => {
        const updatedTaskList = JSON.parse(JSON.stringify(taskList)).filter(
          task => task._id !== res.data._id
        );
        updatedTaskList.push(res.data);

        setTaskList(updatedTaskList);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default ListPage;
