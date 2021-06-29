import React, { useEffect, memo, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

export default memo(() => {
  const dispatch = useDispatch();

  const test = useState(state => state)

  console.log('test', test)

  useEffect(() => {
    dispatch({
      type: "tasks/GET_TASKS",
    });
  }, []);

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


  return (
    <Table
      style={{padding: '40px'}}
      className="utils__scrollTable"
      scroll={{ x: "100%" }}
      rowKey="id"
      columns={columns}
      dataSource={(data && Array.isArray(data) && data) || []}
      pagination={false}
    />
  );
});