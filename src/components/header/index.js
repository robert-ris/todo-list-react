import { useFormik } from 'formik';
import React, { useEffect, memo } from 'react';
import style from './style.css';
import {useDispatch} from 'react-redux';
import { Button, Input, Form } from 'antd'
import * as Yup from 'yup';
import { CloseOutlined } from '@ant-design/icons';

const FormItem = Form.Item
export default memo(() => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      taskName: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch({
        type: 'tasks/ADD_TASK',
        payload: values,
      })
      resetForm()
    },
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required('Please input task name'),
    }),
  })

  

  return (
    <div className="header" >
      <h2>My To To List</h2>
      <div className="row">
        {/* <FormItem>
          <div className="col-7">
            <Input
              // style={{width: '760px', marginLeft: '10px', height: '42px'}}
              placeholder="New task"
              value={formik.values.taskName}
              onBlur={() => formik.handleBlur('taskName')}
              onChange={e => formik.setFieldValue('taskName', e.target.value)}
            />
          </div>
          <div className="col-5">
          <Button 
              // style={{width: '150px', marginLeft: '10px', height: '42px'}}
              key='submit'
              className="addBtn" 
              onClick={formik.handleSubmit}        
            >Add</Button>
          </div>
          
          {formik.errors.taskName && formik.touched.taskName ? 
            (
              <div style={{color: '#fff'}}>{formik.errors.taskName}</div>
            ) : null
          }
        </FormItem> */}

        <div className="col-10">
        <FormItem>
          <Input
            // style={{width: '760px', marginLeft: '10px', height: '42px'}}
            placeholder="New task"
            value={formik.values.taskName}
            onBlur={() => formik.handleBlur('taskName')}
            onChange={e => formik.setFieldValue('taskName', e.target.value)}
          />
        </FormItem>
        </div>
        <div className="col-2" >
        <FormItem>
          <Button 
            style={{width: '150px'}}
            key='submit'
            className="addBtn" 
            onClick={formik.handleSubmit}        
          >
            Add
          </Button>
        </FormItem>
        </div>
        
      </div>
      {formik.errors.taskName && formik.touched.taskName ? 
        (
          <div style={{color: '#fff'}}>{formik.errors.taskName}</div>
        ) : null }
    </div>
  );
});