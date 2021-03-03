<template>
	<div id="app">
		<section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input
					class="new-todo"
					autofocus=""
					autocomplete="off"
					placeholder="What needs to be done?"
					v-model="todoInputRef"
					@keyup.enter="addTodo"
				/>
			</header>
			<section class="main" v-show="todoListRef.length > 0">
				<input id="toggle-all" class="toggle-all" type="checkbox" v-model="checkAllTodo"/>
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<li
						class="todo"
						:class="{
							completed: todo.complete,
							editing: todo === todoActiveRef,
						}"
						v-for="todo in todoFilterListRef"
						:key="todo.id"
					>
						<div class="view">
							<input
								class="toggle"
								type="checkbox"
								v-model="todo.complete"
							/>
							<label @dblclick="editTodo(todo)">{{
								todo.title
							}}</label>
							<button class="destroy" @click="remove(todo)"></button>
						</div>
						<input
							class="edit"
							type="text"
							v-model="todo.title"
							@blur="doneTodo(todo)"
							@keyup.enter="doneTodo(todo)"
							@keyup.escape="cancelEdit(todo)"
						/>
					</li>
				</ul>
			</section>
			<footer class="footer" v-show="todoListRef.length > 0">
				<span class="todo-count" v-show="isremainingRef">
					<strong>{{ remainingRef }}</strong>
					<span>item{{ remainingRef > 1 ? 's' : '' }} left</span>
				</span>
				<ul class="filters">
					<li>
						<a
							href="#/all"
							:class="{ selected: filterSelectRef === 'all' }"
							>All</a
						>
					</li>
					<li>
						<a
							href="#/active"
							:class="{ selected: filterSelectRef === 'active' }"
							>Active</a
						>
					</li>
					<li>
						<a
							href="#/completed"
							:class="{
								selected: filterSelectRef === 'completed',
							}"
							>Completed</a
						>
					</li>
				</ul>
				<button class="clear-completed" v-show="isActiveRef > 0" @click="removeCompleted">
					Clear completed
				</button>
			</footer>
		</section>
	</div>
</template>

<script>
import { ref } from 'vue'
import { newtodoList } from './composition/newtodoList.js'
import { userTodo } from './composition/userTodo.js'
import { todoFilter } from './composition/todoFilter.js'
import { userEditTodo } from './composition/userEditTodo.js'
import { removeTodo } from './composition/removeTodo.js'
import { checkAllTodo } from './utils/todoStorage.js'
export default {
	name: 'App',
	components: {},
	setup() {
		const { todoListRef } = newtodoList()

		return {
			todoListRef,
			...userTodo(todoListRef),
			...todoFilter(todoListRef),
			...userEditTodo(todoListRef),
      ...removeTodo(todoListRef),
		}
	},
}
</script>
