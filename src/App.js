import React, { useState,useEffect } from 'react';
import './App.css';
import { Button,FormControl,InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo.js';
import db from './firebase';
import firebase from 'firebase'
import Footer from './footer.js'


function App() {

const [todos,setTodos] = useState([])
const [input,setInput] = useState(['']);
// When the app loads, we need to listen to the db and fetch new todos as they get added/removed

useEffect(() => {
  //This code fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
        setTodos(snapshot.docs.map (doc =>(
                                            {
                                              id: doc.id, 
                                              todo: doc.data().todo
                                            }
                                          )
                                    )
                )
    })
    }, []);
        const addTodo = (event) => {
          event.preventDefault();  // Prevent JS from reloading Page
            db.collection('todos').add(
                                        {
                                          todo: input,
                                          timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                         }
                                      )
          setTodos([...todos,input])
          setInput(['']); //Clear up input after clicking todo button
        };
    //}
  return (
    <>
    <div className="App">
     <h1> To-Do App <span role='img'>🚀</span>!</h1>
     <form>
      <FormControl>
          <InputLabel>✅Write a Todo</InputLabel>
          <Input value= {input} onChange= {event => setInput(event.target.value)} />
          <FormHelperText id="my-helper-text">Your Input will be recorded</FormHelperText>
          </FormControl><br/>
          <Button type ="submit" onClick = { addTodo } variant="contained" color="primary" disable = {!input}>Add To-do </Button>
          <ul>
            {
                todos.map(todo=> (
                <Todo todo = {todo}/>
              ))
            }
          </ul>
          </form>
    </div>


           <Footer/>
      </>

  );
}
export default App;
