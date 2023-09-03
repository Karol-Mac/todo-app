package com.rest.webservices.restfulwebservices.todo;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	
	private static final List<Todo> todos = new ArrayList<>();
	
	private static int todosCount = 0;
	
	static {
		todos.add(new Todo(++todosCount, "user","Get AWS Certified",
							LocalDate.now().plusYears(2), false ));
		todos.add(new Todo(++todosCount, "user","Learn DevOps",
				LocalDate.now().plusYears(3), false ));
		todos.add(new Todo(++todosCount, "user","Learn Full Stack Development",
				LocalDate.now().plusYears(4), false ));
	}
	
	public List<Todo> findByUsername(String username){
		Predicate<? super Todo> predicate = 
				todo -> todo.getUsername().equalsIgnoreCase(username);
		return todos.stream().filter(predicate).toList();
	}
	
	public Todo addTodo(String username, String description, LocalDate targetDate, boolean done) {
		Todo todo = new Todo(++todosCount,username,description,targetDate,done);
		todos.add(todo);
		return todo;
	}
	
	public void deleteById(int id) {
		todos.removeIf(todo -> todo.getId() == id);
	}

	public Todo findById(int id) {
		return todos.stream().filter(todo -> todo.getId() == id).findFirst().get();
	}

	public Todo updateTodo(Todo todo) {
		deleteById(todo.getId());
		todos.add(todo);
		return todo;
	}
}