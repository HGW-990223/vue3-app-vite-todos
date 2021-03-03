
export function removeTodo(todoListRef) {

  const remove = (todo) => {
    todoListRef.value.splice(todoListRef.value[todo],1)
  }

  const removeCompleted = () => {
    todoListRef.value = todoListRef.value.filter(item => {
      return !item.complete
    })
  }

  return {
    remove,
    removeCompleted
  }
}