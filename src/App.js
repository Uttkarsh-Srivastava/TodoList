import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos/Todos';
import Header from './components/Layouts/Header';
import AddTodo from './components/Todos/AddTodo';
import About from './components/Pages/About';
// import uuid from 'uuid';

class App extends Component {
  state = {
    todos: [
    ]
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => res.json()).then(res => this.setState({ todos: res }))
  }
  //Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    });
  }

  delTodo = (id) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => res.json).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }))
  }

  addTodo = (title) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    }).then(res => res.json()).then(res => this.setState({ todos: [...this.state.todos, res] }));
  }

  render() {
    return (
      <Router>
        <div className="App" >
          <div className="container">
            <Header />
            <Route exact path="/" render={props =>
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            } />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
