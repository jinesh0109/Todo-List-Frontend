import { createSlice } from "@reduxjs/toolkit";

 
const saveState = (state) => {
try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoState", serializedState);
} catch (err) {
    console.error("Error saving state to localStorage:", err);
}
};

const TodoSlice = createSlice({
    name:"TodoList",
    initialState:{
        items:[],
    },
    reducers:{
        addTODO:(state,action)=>{
            state.items.push(action.payload)
            saveState(state);
        },
        editTODO: (state,action)=>{
            const { id, desc, isCompleted } = action.payload;
            const todoToEdit = state.items.find((todo) => todo.id === id);
            if (todoToEdit) {
                todoToEdit.desc = desc;
                todoToEdit.isCompleted = isCompleted
            }
            saveState(state);
        },
        deleteTODO: (state,action) => {
            const idToDelete = action.payload;
            state.items = state.items.filter((todo) => todo.id !== idToDelete);
            saveState(state);
        }
    }
})

export const {addTODO, editTODO, deleteTODO} = TodoSlice.actions

export default TodoSlice.reducer;