import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*Components*/
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Modal,
} from "antd";
import axios from "axios";

function FormAdd({visible, setVisible, user}) {
  const [form] = Form.useForm();
  let location = useLocation();
  const { Option } = Select;
  const { TextArea } = Input;
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    setVisibleModal(visible);
    console.log(user);
  }, [visible]);

//   useEffect(() => {
//     let getApiSkill = async () => {
//       let datas = await axios.get("http://localhost:8080/company/get-all-skill");
//       setSkills(datas.data);
//     };
//     getApiSkill();
//   },[JSON.stringify(location.state)])

  const handleCancel = () => {
    form.resetFields();
    setVisibleModal(false);
    if (typeof setVisible === "function") {
      setVisible(false);
    }
  };
  

  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/post",{
        content: values.content,
        metaTitle: values.meta_title,
        summary: values.summary,
        title: values.title,
        author: location.state.user,
        published: values.publish
      });
      
      if (res) {
        form.resetFields();
        message.success("Thêm thành công!");
        console.log(values);
        setVisible(false);
      }
    } catch (e) {
      console.log("Error", e);
      message.error(e.message);
    }
  };


  return (
    <Modal
    title="Thêm bài viết"
    open={visibleModal}
    onOk={() => handleCancel()}
    onCancel={() => handleCancel()}
    width="50%"
    footer={null}
>
          <Form
            form={form}
            onFinish={onFinish}
            name="form_add_account"
            className="ant-advanced-search-form"
          >
            <Row gutter={15} width="100%">
                <Col lg={24}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please title!" },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={15}>
            <Col lg={24}>
                <Form.Item
                  label="Meta title"
                  name="meta_title"
                  rules={[
                    { required: true, message: "Please meta title!" },
                  ]}
                >
                  <TextArea />
                </Form.Item>   
                </Col>          
            </Row>
            <Row gutter={15}>
            <Col lg={24}>
                <Form.Item
                  label="Content"
                  name="content"
                  rules={[
                    { required: true, message: "Please content!" },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={15}>
            <Col lg={24}>
                <Form.Item
                  label="Summary"
                  name="summary"
                  rules={[
                    { required: true, message: "Please summary!" },
                  ]}
                >
                  <TextArea />
                </Form.Item>  
                </Col>           
            </Row>
            <Row>
                <Form.Item
                  label="Publish"
                  name="publish"
                >
                  <Select>
                    <Option value={true}>Công khai</Option>
                    <Option value={false}>Riêng tư</Option>
                  </Select>
                </Form.Item>                           
            </Row>
            <div>
              <Button
                className="btn-signin"
                type="light"
                size="large"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="btn-signin"
                htmlType="submit"
                type="primary"
                size="large"
              >
                Save
              </Button>
            </div>
          </Form>
    </Modal>
  );
}

export default FormAdd;
