'use client'
import { useState } from 'react'
import DynamicBuilder from './DynamicBuilder'
import FormRenderer from './FormRenderer'
import { Flex } from 'antd';

const FormContainer = () => {
    const [fields, setFields] = useState([]);
    const handleAddFields = (value) => {
        setFields(prev => [...prev, value])
    }
    const handleRemoveFields = (key) => {
        const data = fields.filter(item => item.key != key)
        setFields(data)
    }
    return (
        <Flex justify="space-evenly">
            <FormRenderer fields={fields} handleRemoveField={handleRemoveFields} resetFields={() => setFields([])} />
            <DynamicBuilder handleAddFields={handleAddFields} />
        </Flex>
    )
}

export default FormContainer