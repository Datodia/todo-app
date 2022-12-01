import styled from "styled-components"
import { Props, Todo } from "../../Interface"
import { useState } from 'react'

export const TodoList = ({ dark }: Props) => {

    const [checked, setChecked] = useState<boolean>(false)
    const [newTask, setNewTask] = useState<string>("")
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [filteredTodo, setFilteredTodo] = useState<Todo[]>(todoList);
    const [showFilter, setShowFilter] = useState<boolean>(false);

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
            setFilteredTodo([...todoList, task])
            setNewTask("")
        }
    }

    const deleteTask = (id: number) => {
        let newTodo = todoList.filter((name) => name.id !== id);
        let newTodo2 = filteredTodo.filter((name) => name.id !== id);
        setTodoList(newTodo);
        setFilteredTodo(newTodo2);
    }

    const deleteTodos = () => {
        setTodoList([])
        setFilteredTodo([])
    }

    const filterHandler = (status: string) => {
        if (status === 'active') {
            setShowFilter(true)
            setFilteredTodo(todoList.filter((item) => item.completed === false))
        } else if (status === 'completed') {
            setShowFilter(true);
            setFilteredTodo(todoList.filter((item) => item.completed === true));
        } else {
            setShowFilter(false);
            setTodoList(todoList);
        }
    }

    const completeTask = (id: number) => {
        setTodoList(
            todoList.map((task) => {
                if (task.id === id && task.completed === false) {
                    return { ...task, completed: true }
                } else if (task.id === id && task.completed === true) {
                    return { ...task, completed: false }
                } else {
                    return task
                }
            })
        )

        setFilteredTodo(
            filteredTodo.map((task) => {
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
            {!showFilter && <TodosDiv dark={dark}>
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
            </TodosDiv>}
            {showFilter && <TodosDiv dark={dark}>
                {filteredTodo.map((elem: any) => {
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

            </TodosDiv>}
            <Items dark={dark}>
                <Left>{todoList.length} items left</Left>
                <Left onClick={deleteTodos}>Clear Tasks</Left>
            </Items>
            <ButtonDiv dark={dark}>
                <ActiveBtn onClick={() => filterHandler('all')}>All</ActiveBtn>
                <ActiveBtn onClick={() => filterHandler('active')}>Actve</ActiveBtn>
                <ActiveBtn onClick={() => filterHandler('completed')}>Completed</ActiveBtn>
            </ButtonDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 327px;
    margin: auto;
    margin-top: 40px;
    height: 500px;
    @media screen and (min-width: 768px) {
        width: 540px;
    }
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
    @media screen and (min-width: 768px) {
        height: 64px;
    }
`
const Checked = styled.div<Props>`
    width: 20px;
    height: 20px;
    border: 1px solid #393A4B;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-image: ${props => props.checked ? 'linear-gradient(#55DDFF, #C058F3) ' : null};
    @media screen and (min-width: 768px) {
        width: 24px;
        height: 24px;
    }
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
    @media screen and (min-width: 768px) {
        font-size: 18px;
    }
`
const TodosDiv = styled.div<Props>`
    background-color: red;
    margin-top: 16px;
    border-radius: 5px;
    background-color: ${props => props.dark ? '#25273D' : 'white'} ;
    transition: .5s;
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
    padding: 21px 0;
    font-size: 12px;
    display: flex;
    word-break: break-all;
    align-items: center;
    color: ${props => props.dark ? '#C8CBE7' : '#494C6B'};

    @media screen and (min-width: 768px) {
        font-size: 18px;
        width: 300px;
        transform: translateX(-60px);
    }
`

const Delete = styled.button`
    background: none;
    border: none;
`

const ButtonDiv = styled.div<Props>`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    background-color: ${props => props.dark ? '#25273D' : 'white'} ;
    transition: .5s;
    margin-top: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;    
    justify-content: center;
    gap: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media screen and (min-width: 768px) {
        height: 50px;
        background: transparent;
        transform: translateY(-50px);
        width: 260px;
        margin: auto;
        box-shadow: none;
    }
`

const ActiveBtn = styled.h1`
    font-size: 14px;
    color: #5B5E7E;
    cursor: pointer;
    &:hover{
        color: #3A7CFD;
    }
`

const Items = styled.div<Props>`
    width: 100%;
    height: 48px;
    background-color: ${props => props.dark ? '#25273D' : 'white'} ;
    transition: .5s;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media screen and (min-width: 768px) {
        height: 50px;
    }
`
const Left = styled.h1`
    font-size: 14px;
    color: #5B5E7E;
    cursor: pointer;
    &:hover{
        color: #3A7CFD;
    }
`
