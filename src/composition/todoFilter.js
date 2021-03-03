import { ref, onMounted, onUnmounted, computed } from 'vue'

export function todoFilter (todoListRef) {
  const filterSelectRef = ref('all')
  const validHash = ['all', 'active', 'completed']
  // hash值发生变化时执行的函数
  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/,'');
    filterSelectRef.value = hash;
    if(validHash.includes(hash)){
      return;
    }else{
      location.hash = '';
      filterSelectRef.value = 'all';
    }
  }

  const todoFilterListRef = computed(() => {
    if(filterSelectRef.value === 'all'){
      return todoListRef.value
    }
    else if(filterSelectRef.value === 'active'){
      return todoListRef.value.filter(item => {
        return !item.complete
      })
    }
    else if(filterSelectRef.value === 'completed'){
      return todoListRef.value.filter(item => {
        return item.complete
      })
    }
    else{
      console.log('无效的hash')
    }
  })

  // 显示当前未完成的数量
  const remainingRef = computed(() => {
    return todoFilterListRef.value.filter(item => {
      return !item.complete
    }).length
  })

  // 通过当前hash判断 是否显示未完成数量的模块
  const isremainingRef = computed(() => {
    if(filterSelectRef.value === 'all' || filterSelectRef.value === 'active'){
      return true
    }
  })

  //是否显示  全部清除完成按钮
  const isActiveRef = computed(() => {
    return todoFilterListRef.value.filter(item => {
      return item.complete
    }).length
  })

  

  // 组件挂载完成的生命周期函数
  onMounted(() => {
    // 监听hash值的变化
    window.addEventListener('hashchange', onHashChange)
  })
  // 组件销毁时完成的生命周期函数
  onUnmounted(() => {
    window.addEventListener('hashchange', onHashChange)
  })

  return {
    filterSelectRef,
    todoFilterListRef,
    remainingRef,
    isremainingRef,
    isActiveRef,
  }
}