package grails.todo.angularjs
import grails.rest.Resource

@Resource(uri='/todos')
class Todo {

	String title
    Boolean completed = false

    static constraints = {
    }
}
