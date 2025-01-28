'use client'
import { useState } from 'react'
import { Form, Input, Button, Select, Radio, Checkbox, DatePicker, Upload, Card, Modal } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
const FormRenderer = ({ fields, handleRemoveField, resetFields }) => {

    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [modal, setModal] = useState(false);

    const handleFieldChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return <Input placeholder={field.placeholder} onChange={(e) => handleFieldChange(field.key, e.target.value)} />;
            case 'dropdown':
                return (
                    <Select placeholder={field.placeholder} onChange={(value) => handleFieldChange(field.key, value)} style={{ width: '100%' }}>
                        {field.options.map(option => (
                            <Select.Option value={option.name}>{option.name}</Select.Option>

                        ))}
                    </Select>
                );
            case 'radio':
                return (
                    <Radio.Group placeholder={field.placeholder} onChange={(e) => { handleFieldChange(field.key, e.target.value); }}>
                        <Radio value="yes">Yes</Radio>
                        <Radio value="no">No</Radio>
                    </Radio.Group>
                );
            case 'file':
                return <Upload placeholder={field.placeholder} beforeUpload={() => false} onChange={(info) => handleFieldChange(field.key, info.file)}>
                    <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>;
            case 'checkbox':
                return (
                    <Checkbox placeholder={field.placeholder} onChange={(e) => handleFieldChange(field.key, e.target.checked)}>
                        Accept Terms
                    </Checkbox>
                );
            case 'phone':
                return <PhoneInput placeholder={field.placeholder} international value={formData[field.key]} onChange={(value) => handleFieldChange(field.key, value)} />;
            case 'date':
                return <DatePicker placeholder={field.placeholder} onChange={(date, dateString) => handleFieldChange(field.key, dateString)} />;
            default:
                return null;
        }
    };
    const renderFields = (fields) => {
        return fields.map((field) => {
            return (
                <>

                    <Form.Item
                        key={field.key} label={field.label} name={field.name}
                        rules={[{ required: field.required, message: `${field.label} is required` }]}
                        {...(field.type === 'checkbox' ? { valuePropName: 'checked' } : {})}
                    >
                        {renderField(field)}
                    </Form.Item>
                    <Button
                        type="link"
                        icon={<CloseOutlined />}
                        style={{ float: "right", marginTop: "5px", color: 'red' }}
                        onClick={() => handleRemoveField(field.key)}
                    />
                </>

            );
        });
    };
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                console.log('Form data:', values);
                setFormData(values);
                form.resetFields();
                setModal(true);
                // resetFields();
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };
    return (
        <>
            <Card title="Form Display" style={{ width: "500px" }}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}
                >
                    {renderFields(fields)}
                    <Button type="primary" onClick={handleSubmit} style={{ marginTop: "50px" }}>Submit</Button>
                </Form>
            </Card>
            <Modal
                open={modal}
                footer={[
                    <Button key="ok" type="primary" onClick={() => { setModal(false); resetFields(); }}>
                        OK
                    </Button>,
                ]}>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Modal>
        </>
    )
}

export default FormRenderer