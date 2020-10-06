import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Table as AntdTable, Tag, Space} from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: 350,
      width: '100%',
    },
  })
);

const DataGridComponent = () => {
  const classes = useStyles();

  const columns: any[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      filters: [
        {
          text: 'John',
          value: 'John',
        },
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
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
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
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
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Joe Blac',
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
      description: 'this is descrip',
    },
    {
      key: '4',
      name: 'Jim Black',
      age: 52,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      description: 'this is descrip',
    },
  ];
  return (
    <Container>
      <div className={classes.root}>
        <AntdTable
          columns={columns}
          expandable={{
            expandedRowRender: (record: any) => (
              <p style={{margin: 0}}>{record.description}</p>
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          dataSource={data}
          pagination={{pageSize: 3}}
        />
      </div>
    </Container>
  );
};

export default DataGridComponent;
