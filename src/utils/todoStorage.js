const TODO_KEY = 'todoList';  //在localStorage获取的key

/**
 * 获取localStorage中TODO_KEY的值
 */
export function fetch () {
  const result = localStorage.getItem(TODO_KEY);
  if(result){
    return JSON.parse(result)
  }else{
    return [];
  }
}

/**
 * 把todoInput中输入的值保存在localStorage的TODO_KEY中
 * @param {*} info 需要保存的值
 */
export function save (info) {
  localStorage.setItem(TODO_KEY,JSON.stringify(info))
}

//生成一个 时间戳+随机4位数
export function getTodoId () {
  return new Date().getTime() + Math.random().toString(16).substr(2,4);
}

export function checkAllTodo (todoListRef) {
  console.log(todoListRef.value)
}
