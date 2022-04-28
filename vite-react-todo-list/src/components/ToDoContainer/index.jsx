import React from 'react'
import { List, Space } from 'antd'
import { CloseSquareOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { STATUS } from "../../config/status"
const ToDoContainer = (props) => {
    const { todos = [], onOperate } = props;

    const handleOperate = (operate, item) => {
        if (operate === "close") {
            onOperate && onOperate({
                ...item,
                status: STATUS.IS_CLOSE
            })
        } else if (operate === "check") {
            onOperate && onOperate({
                ...item,
                status: STATUS.IS_DONE
            })
        }

    }

    const showTodos = todos.filter(todo => todo.status !== STATUS.IS_CLOSE);

    return (
        <div className="todo-container">
            <List
                dataSource={showTodos}
                renderItem={(todo) => (
                    <List.Item className='todo-list-item'>
                        {todo.content}
                        <Space>
                            <CloseSquareOutlined onClick={() => handleOperate('close', todo)} />
                            <CheckCircleOutlined onClick={() => handleOperate('check', todo)} />
                        </Space>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ToDoContainer;