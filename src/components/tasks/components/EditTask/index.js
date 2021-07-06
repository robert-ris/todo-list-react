import React, { memo, useEffect } from "react";
import { Button, Input, Modal, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";


const FormItem = Form.Item;

export default memo(({ open, triggerOpenClose, taskId }) => {
  const dispatch = useDispatch();

  console.log('taskId', taskId)
  const task = useSelector((state) => (state.tasks && state.tasks.task) || {});
  useEffect(() => {
    if (taskId) {
      dispatch({
        type: "tasks/GET_TASK",
        payload: {
          id: taskId
        },
      });
    }
  }, [taskId]);

  const formik = useFormik({
    initialValues: Object.assign(
      {
        taskName: "",
        taskDescription: "",
      },
      {
        id: task.id,
        taskName: task.taskName,
        taskDescription: task.taskDescription
      }
    ),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      Object.keys(values).map((key) => {
        formData.append(key, (typeof values[key] === "object" && JSON.stringify(values[key])) || values[key]);
      });

      formData.delete("file");
      if (values.file && values.file.name) {
        formData.append("file", values.file, (values.file && values.file.name) || null);
      }

      dispatch({
        type: "tasks/UPDATE_TASK",
        payload: {
          ...values
        }
        
      });
      resetForm();
      triggerOpenClose();
    },
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required("Please input title"),
      taskDescription: Yup.string().required("Please input description"),

    }),
    enableReinitialize: true,
  });
  

  return (
    <div>
      {(open && (
        <div>
          <Modal
            title="Edit Task"
            visible={open}
            onOk={() => triggerOpenClose()}
            onCancel={() => triggerOpenClose()}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  triggerOpenClose();
                }}
              >
                Return
              </Button>,
              <Button key="submit" type="primary" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                Update
              </Button>,
            ]}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <FormItem
                    validateStatus={(formik.errors.taskName && formik.touched.taskName && "error") || "success"}
                    help={(formik.errors.taskName && formik.touched.taskName && formik.errors.taskName) || ""}
                    label="Task name"
                  >
                    <Input placeholder="Task Name" type="text" name="taskName" value={formik.values.taskName} onChange={(e) => formik.setFieldValue("taskName", e.target.value)} />
                  </FormItem>
                </div>
                <div className="col-md-12 col-sm-12">
                  <FormItem
                    validateStatus={(formik.errors.taskDescription && formik.touched.taskDescription && "error") || "success"}
                    help={(formik.errors.taskDescription && formik.touched.taskDescription && formik.errors.taskDescription) || ""}
                    label="Task description"
                  >
                    <Input placeholder="Task Description" type="text" name="taskDescription" value={formik.values.taskDescription} onChange={(e) => formik.setFieldValue("taskDescription", e.target.value)} />
                  </FormItem>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      )) ||
        ""}
    </div>
  );
});
