import React, { Component } from 'react';
import UserForm from './components/UserForm';

//import './App.css';

class App extends Component {

/*
	toggleCheck = (id) => {
		console.log(id)
		this.setState({todos: this.state.todos.map(todo => {
			if (todo.id === id) {
				todo.checked = !todo.checked
			}
			return todo
		})})
	}
*/

  render() {
    return (
        <div 
          style={{
            display: "block",
            
            
          }}
        >
            <UserForm />
        </div>
    );
  }
}

export default App;
