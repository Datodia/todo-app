import styled from "styled-components"
import { Props } from "../../Interface"
import { useState } from 'react'

export const TodoList = ({ dark, value }: Props) => {

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
        if (newTask !== '' && newTask.trim()) {
            setTodoList([...todoList, task])
            setNewTask("")
        }

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
            <InputDiv onSubmit={addTodo} dark={dark}>
                <Checked onClick={handleCkecked} checked={checked}>
                    {checked ? <Img src="assets/svg/icon-check.svg" /> : null}
                </Checked>
                <Input
                    dark={dark}
                    type={"text"}
                    onChange={handleChange}
                    value={newTask}
                    placeholder={'Create a new todo…'}
                />
            </InputDiv>
            <TodosDiv dark={dark}>
                {todoList.map((elem: any) => {
                    return (
                        <Todos dark={dark}>
                            <Checked onClick={() => completeTask(elem.id)} checked={elem.completed} >
                                {elem.completed ? <Img src="assets/svg/icon-check.svg" /> : null}
                            </Checked>
                            <ListItem completed={elem.completed} dark={dark}>{elem.taskName}</ListItem>
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
    padding: 0 20px;
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

const Input = styled.input<Props>`
    background-color: transparent;
    font-size: 12px;
    border: none;
    margin-left: 12px;
    outline: none;
    width: 80%;
    color: ${props => props.dark ? '#767992' : '#9495A5'};
`
const TodosDiv = styled.div<Props>`
    background-color: red;
    margin-top: 16px;
    border-radius: 5px;
    background-color: ${props => props.dark ? '#25273D' : 'white'} ;
    transition: .5s;
    /* height: 500px;
    overflow-y: auto; */
`
const Todos = styled.ul<Props>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${props => props.dark ? "1px solid #393A4B" : "1px solid #E3E4F1"};
    padding: 0 20px;
    transition: .5s;
`
const ListItem = styled.li<Props>`
    text-decoration: none;
    list-style: none;
    text-decoration: ${props => props.completed ? "line-through" : 'none'};
    height: auto;
    width: 210px;
    padding: 16px 0;
    font-size: 12px;
    display: flex;
    word-break: break-all;
    align-items: center;
    color: ${props => props.dark ? '#C8CBE7' : '#494C6B'};
   //color: ${props => props.completed && !props.dark ? '#4D5067' : '#D1D2DA'}
`

const Delete = styled.button`
    background: none;
    border: none;
`