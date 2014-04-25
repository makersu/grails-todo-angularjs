import grails.todo.angularjs.Todo
class BootStrap {

    def init = { servletContext ->
    	new Todo(title:"Todo1").save()
        new Todo(title:"Todo2").save()
    }
    def destroy = {
    }
}
