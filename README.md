grails-todo-angularjs
=====================

grails todo example with angularjs

#Backend
##grails create-domain-class Todo 
```
package grails.todo.angularjs
import grails.rest.Resource

@Resource(uri='/todos')
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


#FrontEnd
##using bower for front-end package management
```
cd grails-todo-angularjs/web-app
bower install angular
bower install angular-route
bower install todomvc-common
```

##copy from todomvc angularjs example (https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/angularjs)
```
cd grails-todo-angularjs/web-app/js
cp /todomvc/architecture-examples/angularjs/js/app.js .
cp /todomvc/architecture-examples/angularjs/js/controllers .
cp /todomvc/architecture-examples/angularjs/js/directives .
cp /todomvc/architecture-examples/angularjs/js/services .
```

##create index.gsp
```

```
