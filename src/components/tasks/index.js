import React, { useEffect, memo, useCallback, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import 'antd/dist/antd.css';
import { Table, Tag, Space, Popconfirm, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditTaskModal } from './components';

export default memo(() => {
  const dispatch = useDispatch();

  const tasks = useSelector(state => (state.tasks && state.tasks.tasksList) || []);
  const task = useSelector((state) => (state.tasks && state.tasks.task) || {});

  const [ editTaskModal, setEditModal ] = useState(false);
  const [ idTask, setIdTask ] = useState(false);

  const triggerEditTaskModal = useCallback(() => setEditModal((state) => !state));

  const triggerEditTask = useCallback((id) => {
    setIdTask(id);
    triggerEditTaskModal()
  })

  useEffect(() => {
    dispatch({
      type: "tasks/GET_TASKS",
    });
  }, []);

  const triggerRemoveTask = useCallback((id) => {
    dispatch({
      type: 'tasks/DELETE_TASK',
      payload: id
    })
  })

  const triggerNotFinished = useCallback((id) => {
    dispatch({
      type: 'tasks/UPDATE_STATUS',
      payload: {
        id,
        status: 0
      }
    })
  }, [])

  const triggerFinished = useCallback((id) => {
    dispatch({
      type: 'tasks/UPDATE_STATUS',
      payload: {
        id,
        status: 1
      }
    })
  }, [])


  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName'
    },
    {
      title: 'Task Description',
      dataIndex: 'taskDescription',
      key: 'taskDescription',
    },
    {
      title: 'Status',
      key: 'status',
      render: record => {
        if (record.status === 1) {
          return (
            <Tag onClick={() => triggerNotFinished(record.id)} color="blue" style={{ hover: 'pointer'}}>
              Finished
            </Tag>
          )
          
        } else {
          return <Tag onClick={() => triggerFinished(record.id)} color="red">Not Finished</Tag>
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
           <Button type="secondary" onClick={() => triggerEditTask(record.id)}>
            <EditOutlined />
          </Button>
          <Popconfirm title="Are you sure you want to delete this task?" onConfirm={() => triggerRemoveTask(record.id)}>
            <Button type="secondary">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
    <Table
        style={{padding: '40px'}}
        className="utils__scrollTable"
        scroll={{ x: "100%" }}
        rowKey="id"
        columns={columns}
        dataSource={(tasks && Array.isArray(tasks) && tasks) || []}
        pagination={false}
      />
      < EditTaskModal open={editTaskModal} triggerOpenClose={triggerEditTaskModal} taskId={idTask} />
    </div>
 
  );
});