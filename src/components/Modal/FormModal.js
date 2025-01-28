import React from 'react'
import { Modal, Form, Input, Button, Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const FormModal = ({ form, handleFieldForm, type, open, setModal }) => {
    return (
        <Modal
            title="Add Field Data"
            open={open}
            onClose={() => setModal(false)}
            onCancel={() => setModal(false)}
            onOk={handleFieldForm}>
            <Form form={form}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 12 }}
                initialValues={{ required: "no", options: [{}] }}
            >
                <Form.Item
                    name="label"
                    label="Label Name"
                    rules={[{ required: true, message: 'Field name is required' }]}
                >
                    <Input placeholder="Please input field name" />
                </Form.Item>
                <Form.Item
                    name="placeholder"
                    label="Field Placeholder"
                    rules={[{ required: true, message: 'Field placeholder is required' }]}
                >
                    <Input placeholder="Please input field placeholder" />
                </Form.Item>
                {type == 'dropdown' &&
                    <Form.Item label="Options">
                        <Form.List
                            name="options"
                            initialValue={[{ name: '' }]}
                        >
                            {(fields, { add, remove }) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        rowGap: 16,
                                        flexDirection: 'column',
                                    }}
                                >
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            key={field.key}
                                            noStyle
                                            label={`Option ${index + 1}`}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Form.Item
                                                    noStyle
                                                    name={[field.name, 'name']}
                                                    rules={[
                                                        { required: true, message: 'Option is required' },
                                                        ...(index === 0 ? [] : [{ message: 'At least one option is required' }])
                                                    ]}
                                                >
                                                    <Input placeholder={`Option ${index + 1}`} />
                                                </Form.Item>

                                                {fields.length > 1 && (
                                                    <Button
                                                        type="link"
                                                        style={{ color: index === 0 ? '' : 'red' }}
                                                        icon={<CloseOutlined />}
                                                        onClick={() => remove(field.name)}
                                                        disabled={index === 0} // Disable remove button for the first option
                                                    />
                                                )}
                                            </div>
                                        </Form.Item>
                                    ))}

                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        + Add Option
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Form.Item>
                }
                <Form.Item
                    name="required"
                    label="Field required"
                    rules={[{ required: true, message: 'Field placeholder is required', type: "boolean" }]}
                >
                    <Radio.Group >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FormModal