import React, { useState } from "react";
import { Input, Button } from "antd"
import { STATUS } from "../../config/status"

const ToDoItem = (props) => {
    const { onSubmit } = props;
    const [todoItem, setTodoItem] = useState({});

    const handleChange = (e) => {
        setTodoItem({
            id: Math.random(), // id可以用雪花算法生成唯一不重复的值
            status: STATUS.IS_CREATE,
            content: e.target.value
        })
        
    }

    const handleSubmit = () => {
        onSubmit && onSubmit(todoItem);
    }

    return (
        <div className="to-do-item">
            <Input value={todoItem.content} onPressEnter={handleSubmit} onChange={handleChange} />
            <Button type="primary" size="large" onClick={handleSubmit} >提交</Button>
        </div>
    )
}

export default ToDoItem;