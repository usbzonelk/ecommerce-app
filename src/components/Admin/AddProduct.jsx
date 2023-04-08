import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  message,
  Modal,
} from "antd";
const { TextArea } = Input;
import { UploadOutlined } from "@ant-design/icons";
import { useAddNewItemMutation } from "../../redux/features/users/adminManagement";
import { useState } from "react";

const AddProduct = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { visible, onCancel } = props;
  const [addNewItem, { isLoading, isError, error }] = useAddNewItemMutation();

  const [componentSize, setComponentSize] = useState("large");
  const [imageOption, setImageOption] = useState("upload");
  let submitErr = null;
  const handleSubmit = async (formData) => {
    const sendFormData = { ...formData };
    console.log(formData);
    sendFormData["images"] = [formData.image];

    try {
      await addNewItem(sendFormData);
    } catch (error) {
      submitErr = error.message;
      console.log(error);
    }
    console.log("Form data:", sendFormData);
    if (submitErr || isError) {
      messageApi.open({
        type: "error",
        content: submitErr || error.message,
      });
    } else {
      messageApi.open({
        type: "success",
        content: "Product was added Successfully",
      });
    }
  };

  const validatePositiveInteger = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        resolve("");
      } else if (Number.isNaN(Number(value))) {
        reject("Please enter a valid number");
      } else if (value <= 0) {
        reject("Please enter a positive number");
      } else if (!Number.isInteger(value)) {
        reject("Please enter an integer");
      } else {
        resolve();
      }
    });
  };

  const validatePositiveNumber = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        resolve(""); // allow empty input
      } else if (Number.isNaN(Number(value))) {
        reject("Please enter a valid number");
      } else if (value <= 0) {
        reject("Please enter a positive number");
      } else {
        resolve();
      }
    });
  };

  const handleImageOptionChange = (e) => {
    setImageOption(e.target.value);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <Modal
        title="Add Product"
        open={visible}
        onCancel={onCancel}
        footer={null}
      >
        {contextHolder}
        <Form
          onFinish={handleSubmit}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          size={componentSize}
          style={{
            maxWidth: 800,
            margin: "auto 0.5rem",
          }}
        >
          <Form.Item
            name="title"
            label="Item title"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[{ required: true, message: "Please enter your input" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[{ required: true, message: "Please enter your input" }]}
          >
            <Select>
              <Select.Option value="dell">Dell</Select.Option>
              <Select.Option value="asus">Asus</Select.Option>
              <Select.Option value="lenovo">Lenovo</Select.Option>
              <Select.Option value="apple">Apple</Select.Option>
              <Select.Option value="acer">Acer</Select.Option>
              <Select.Option value="msi">MSI</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Stock Quantity"
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveInteger },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="RAM size in GB"
            name="ram"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveInteger },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="processor"
            label="Processor codename"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[{ required: true, message: "Please enter your input" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Screen size in inches"
            name="screenSize"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveNumber },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="HDD size in GB"
            name="ssd"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveInteger },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Original Price"
            name="unitPrice"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveNumber },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Discount Percentage"
            name="disPrecentage"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveNumber },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Discounted Price"
            name="disPrice"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[
              { required: true, message: "Please enter your input" },
              { validator: validatePositiveNumber },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Item Description"
            name="description"
            style={{
              whiteSpace: "prewrap",
              wordBreak: "break-word",
            }}
            rules={[{ required: true, message: "Please enter your input" }]}
          >
            <TextArea
              placeholder="Enter what you wanna show to the visitors"
              allowClear
            />
          </Form.Item>

          <Form.Item label="Upload Photo" name="uploads-pic">
            <Radio.Group value={imageOption} onChange={handleImageOptionChange}>
              {" "}
              <Radio.Button value="url">Add Link</Radio.Button>
              <Radio.Button value="upload">Upload Image</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {imageOption === "upload" ? (
            <Form.Item
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                name="image"
                action="https://upload.imagekit.io/api/v1/files/upload"
                headers={{
                  Authorization: "6d207e02198a847aa98d0a2a901485a5",
                }}
                listType="picture"
                showUploadList={true}
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          ) : (
            <Form.Item
              label="Image URL"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please enter an image URL",
                },
              ]}
            >
              <Input placeholder="Enter Image URL" />
            </Form.Item>
          )}

          <Form.Item label="">
            <div style={{ textAlign: "center" }}>
              <Button type="dashed" htmlType="submit" loading={isLoading}>
                Add Item
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddProduct;
