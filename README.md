grails-todo-angularjs
=====================

grails todo example with angularjs

#Backend(Grails)
##grails create-domain-class Todo 
```
package grails.todo.angularjs
import grails.rest.Resource

@Resource(uri='/todos', formats=['json', 'xml'])
class Todo {

	String title
    Boolean completed = false

    static constraints = {
    }
}
```

##update BootStrap.groovy
```
import grails.todo.angularjs.Todo
class BootStrap {

    def init = { servletContext ->
    	new Todo(title:"Todo1").save()
        new Todo(title:"Todo2").save()
    }
    def destroy = {
    }
}
```

#FrontEnd(Angularjs)
##using bower for front-end package management
```
cd grails-todo-angularjs/web-app
bower install angular
bower install angular-route
bower install todomvc-common
```

##copy todomvc angularjs example 
###(https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs)
```
cd grails-todo-angularjs/web-app/js
cp ~/todomvc/architecture-examples/angularjs/js/app.js .
cp ~/todomvc/architecture-examples/angularjs/js/controllers .
cp ~/todomvc/architecture-examples/angularjs/js/directives .
cp ~/todomvc/architecture-examples/angularjs/js/services .
```

##copy todomvc index.html as index.gsp
```
cd grails-todo-angularjs/grails-app/views
cp ~/home/mark/git/todomvc/architecture-examples/angularjs/index.html index.gsp
```

##using $http for rest resource

###module setting
```
angular.module('todomvc')
	.constant("baseUrl","/grails-todo-angularjs/todos/")
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage, $http, baseUrl) {
```
###addTodo
```
$scope.addTodo = function () {

			...
			
			$http.post(baseUrl,$scope.newTodo)
			.success(function(newTodo){
				$scope.todos.push(newTodo);
			});

			$scope.newTodo = '';
		};
```
###removeTodo
```
$scope.removeTodo = function (todo) {
			...

			$http.delete(baseUrl+todo.id)
			.success(function(){
				$scope.todos.splice($scope.todos.indexOf(todo), 1);
			});
		};
```
###doneEditing
```
$scope.doneEditing = function (todo) {
			...

			$http.put(baseUrl+todo.id,todo)
			.success(function(modifiedTodo){
				console.log("modifiedTodo="+modifiedTodo);
			})

		};
```

#test
```
grails run-app
Browse to http://localhost:8080/grails-todo-angularjs
```
