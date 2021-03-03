import { ref } from 'vue'
import {fetch, save, getTodoId} from '../utils/todoStorage.js'

export function userTodo (todoListRef) {
  const todoInputRef = ref('');

  // 新增任务的方法
  const addTodo = () => {
    const value = todoInputRef.value && todoInputRef.value.trim();
    if(!value){
      return;
    }

    //生成任务对象，并将其添加到任务列表
    const todo = {
      title: value,
      complete: false,
      id: getTodoId(),
    }

    todoListRef.value.push(todo)
    todoInputRef.value = ''
  }

  return {
    todoInputRef,
    addTodo
  }
}