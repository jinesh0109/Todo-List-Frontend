import { useDispatch, useSelector } from "react-redux"
import { deleteTODO, editTODO } from "../utils/TodoSlice";
import { useEffect, useState } from "react";

const TodoListComponent = (props) => {
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState(props.filterType);
    const [todoList, setTodoList] = useState([]);
    const [editItemId, setEditItemId] = useState(false)
    const [editItem, setEditItem] = useState('')

    const handleEditTodoItem = (item) => {
        dispatch(editTODO(item))
    }

    const handleDeleteTodoItem = (item) => {
        dispatch(deleteTODO(item.id))
    }
    const filterTodoList = () => {
        const tasksCompleted = (props.filterType === 'activeTasks') ? false : true
        if (props.filterType === 'allTasks') {
            setTodoList(todoListItems)
        }
        else {
            const filterTodoItems = todoListItems.filter((items) => items.isCompleted === tasksCompleted)
            setTodoList(filterTodoItems)
        }
    }
    const changeTaskStatus = (item) => {
        const updatedStatus = { ...item, isCompleted: !item.isCompleted }
        handleEditTodoItem(updatedStatus)
    }
    const editTaskItem = (item) =>{
        setEditItemId('');
        const updatedItem = {...item, desc: editItem}
        handleEditTodoItem(updatedItem)
    }
    const todoListItems = useSelector((store) => store.todo.items)

    useEffect(() => {
        setFilterType(props.filterType)
        filterTodoList()
    }, [props, todoListItems])

    return (
        <>
            {todoList.length == 0 ?
                <div className="text-lg text-blue-500 pt-10 flex justify-center items-center">You have no Task in this section , kindly add your Tasks to TODO</div>
                :
                <>
                    {props.filterType === 'activeTasks' ? <div className="ml-[450px] pt-10 text-lg font-medium"> {todoList.length} Tasks Remaining</div> : ''}
                    {props.filterType === 'allTasks' ? <div className="ml-[450px] pt-10 text-lg font-medium"> {todoList.length} Tasks in list</div> : ''}
                    {props.filterType === 'completedTasks' ? <div className="ml-[450px] pt-10 text-lg font-medium"> {todoList.length} Tasks Completed</div> : ''}
                    <div className="ml-[450px] flex flex-col gap-2">
                        {
                            todoList.map((list) => {
                                return (
                                    <div key={list.id} className="flex flex-col justify-start items-start">
                                        <div className="flex gap-2 text-lg font-medium">
                                            <input checked={list.isCompleted} type="checkbox" onChange={() => changeTaskStatus(list)} />
                                            {editItemId == list.id?
                                                <div className="flex gap-2">
                                                    <input type="text" value={editItem} onChange={(e)=>setEditItem(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5"/>
                                                    <button onClick={() => {editTaskItem(list)}} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2">Edit</button>
                                                    <button onClick={() => {setEditItemId('')}} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2">Cancel</button>        
                                                </div> : 
                                                <div>{list.desc}</div>
                                            }

                                        </div>
                                        <div className="flex gap-4 mt-2">
                                            <button onClick={() => {setEditItemId(list.id),setEditItem(list.desc)}} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2">Edit {list.desc}</button>
                                            <button onClick={() => handleDeleteTodoItem(list)} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded px-4 py-2">Delete {list.desc}</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}
export default TodoListComponent