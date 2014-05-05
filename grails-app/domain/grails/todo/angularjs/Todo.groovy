package grails.todo.angularjs
import grails.rest.Resource

@Resource(uri='/todos', formats=['json', 'xml'])
class Todo {

	String title
    Boolean completed = false

    static constraints = {
    }
}
