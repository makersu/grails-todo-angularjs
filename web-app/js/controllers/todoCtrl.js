/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.constant("baseUrl","/grails-todo-angularjs/todos/")
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage, $http, baseUrl) {
		'use strict';
		//var todos = $scope.todos = todoStorage.get();

		$scope.todos=[];
		$http.get(baseUrl).success(function(data){$scope.todos=data;});

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function (newValue, oldValue) {
			$scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
			$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
			if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
				todoStorage.put($scope.todos);
			}
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {
			var status = $scope.status = $routeParams.status || '';

			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : null;
		});

		$scope.addTodo = function () {

			var newTodoTitle = $scope.newTodo.title.trim();
			if (!newTodoTitle.length) {
				return;
			}

			// $scope.todos.push({
			// 	title: newTodo,
			// 	completed: false
			// });
			
			$http.post(baseUrl,$scope.newTodo)
			.success(function(newTodo){
				$scope.todos.push(newTodo);
			});

			$scope.newTodo = '';
		};

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();
			if (!todo.title) {
				$scope.removeTodo(todo);
			}

			$http.put(baseUrl+todo.id,todo)
			.success(function(modifiedTodo){
				console.log("modifiedTodo="+modifiedTodo);
			})

		};

		$scope.revertEditing = function (todo) {
			$scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
			$scope.doneEditing($scope.originalTodo);
		};

		$scope.removeTodo = function (todo) {
			//$scope.todos.splice($scope.todos.indexOf(todo), 1);

			$http.delete(baseUrl+todo.id)
			.success(function(){
				$scope.todos.splice($scope.todos.indexOf(todo), 1);
			});
		};

		$scope.clearCompletedTodos = function () {
			$scope.todos = $scope.todos = $scope.todos.filter(function (val) {
				
				return !val.completed;
			});
		};

		$scope.markAll = function (completed) {
			$scope.todos.forEach(function (todo) {
				todo.completed = !completed;
			});
		};

	});
