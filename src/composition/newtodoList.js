import { ref,watchEffect } from 'vue'
import {fetch, save} from '../utils/todoStorage.js'

export function newtodoList() {
  const todoListRef = ref(fetch());  //默认的todo列表
  watchEffect(() => {
    save(todoListRef.value)
  })

  return {
    todoListRef,
  }
}