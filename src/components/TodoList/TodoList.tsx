import styled from "styled-components"
import { Props } from "../../Interface"
import { useState } from 'react'

export const TodoList = ({ dark }: Props) => {

    const [checked, setChecked] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<string>("")
    const [todoList, setTodoList] = useState<any>([])

    const handleCkecked = () => {
        setChecked(!checked)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value)
    }

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const task = {
            id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
            taskName: newTask,
            completed: checked
        }
        setTodoList([...todoList, task])
    }

    const deleteTask = (id: number) => {
        setTodoList(
            todoList.filter((item: any) => {
                return item.id !== id;
            })
        )
    }

    const completeTask = (id: number) => {
        setTodoList(
            todoList.map((task: any) => {
                if (task.id === id && task.completed === false) {
                    return { ...task, completed: true }
                } else if (task.id === id && task.completed === true) {
                    return { ...task, completed: false }
                } else {
                    return task
                }
            })
        )
    }

    return (
        <Wrapper>
            <InputDiv onSubmit={addTodo}>
                <Checked onClick={handleCkecked} checked={checked}>
                    {checked ? <Img src="assets/svg/icon-check.svg" /> : null}
                </Checked>
                <Input
                    type={"text"}
                    onChange={handleChange}
                />
            </InputDiv>
            <TodosDiv>
                {todoList.map((elem: any) => {
                    return (
                        <Todos>
                            <Checked onClick={() => completeTask(elem.id)} checked={elem.completed} >
                                {elem.completed ? <Img src="assets/svg/icon-check.svg" /> : null}
                            </Checked>
                            <ListItem completed={elem.completed}>{elem.taskName}</ListItem>
                            <Delete
                                onClick={() => deleteTask(elem.id)}
                            ><Img src="assets/svg/icon-cross.svg" /></Delete>
                        </Todos>
                    )
                })}
            </TodosDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 327px;
    margin: auto;
    margin-top: 40px;
    height: 500px;
    border: 1px solid red;
`

const InputDiv = styled.form<Props>`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: ${props => props.dark ? '#25273D' : 'white'} ;
    transition: all .5s;
`
const Checked = styled.div<Props>`
    width: 20px;
    height: 20px;
    border: 1px solid #393A4B;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-image: ${props => props.checked ? 'linear-gradient(#55DDFF, #C058F3) ' : null} 
`
const Img = styled.img`
    
`

const Input = styled.input`
    background-color: transparent;
`
const TodosDiv = styled.div`
    
`
const Todos = styled.ul`
    display: flex;
    justify-content: space-between;
`
const ListItem = styled.li<Props>`
    text-decoration: none;
    list-style: none;
    text-decoration: ${props => props.completed ? "line-through" : 'none'};
`

const Delete = styled.button`
    background: none;
    border: none;
`