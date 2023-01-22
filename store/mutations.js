export default {
    setTask(state, val) {
        state.states.task = val
    },
    addTask(state, val) {
        console.log(state.states)
        state.states.taskList.push(val)
    },
    setFilteredList(state, val) {
        state.states.filteredList = val
    },
    deleteTask(state, val) {
        const index = state.states.taskList.indexOf(val);
        state.states.taskList.splice(index, 1)
    },
    changeTaskState(state, val) {
        const index = state.states.taskList.indexOf(val);
        let list = state.states.taskList
        for (let k = 0; k < list.length; k++) {
            if (k === index) {
                list[k].done = !list[k].done
                list[k].completedAt = new Date()
            }
        }
    }
}