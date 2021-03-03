import { ref,computed } from 'vue'
export function userEditTodo (todoListRef) {

  const todoActiveRef = ref(null);  //正在修改的todo
  let originTitle = ''; //缓存在修改前的title值

  // 修改todo
  const editTodo = (todo) => {
    originTitle = todo.title
    todoActiveRef.value = todo
  }

  //修改完成
  const doneTodo = (todo) => {
    const title = todo.title.trim();
    if(title){
      todoActiveRef.value = null
    }else{
      todoListRef.value.splice(todo,1)
    }
  }

  // 取消修改
  const cancelEdit = (todo) => {
    todoActiveRef.value = null
    todo.title = originTitle
  }

  const checkAllTodo = computed({
    get(){
      return todoListRef.value.filter(item => {
        return !item.complete
      }).length === 0
    },
    set(checked){
      todoListRef.value.forEach(item => {
        return item.complete = checked
      })
    }
  })

  return {
    editTodo,
    todoActiveRef,
    doneTodo,
    cancelEdit,
    checkAllTodo
  }
}