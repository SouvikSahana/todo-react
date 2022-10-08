import { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { FormControl, InputLabel ,Input} from '@mui/material';
import Todo from './Todo';
import db from "./firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('')

useEffect(()=>{
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
    setTodos(snapshot.docs.map(doc=>({id:doc.id, todo: doc.data().todo, time: doc.data().timestamp})))
    // console.log(snapshot.docs.map(doc=>doc.data()))
  })
},[])

  const addTodo=(e)=>{
    e.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    // setTodos([...todos,input])
    setInput('')
  }
  return (
    <div className="App">
      {/* <p>{process.env.NODE_ENV}</p> */}
      <h5>Make a Note😃</h5>
      
    <FormControl>
      <InputLabel className='heading'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Write a Note</InputLabel>
      <Input value={input} className="input" onChange={e=> setInput(e.target.value)} multiline />
    </FormControl>

      <Button variant="contained" type='submit' disabled={!input} onClick={addTodo} size="small">
      Add Todo
        </Button>
      <ul>
        {todos.map(item=>{
          return (
            <Todo text={item} key={item.id}/>
          )
        })}
      </ul>
    </div>
  );
}

export default App;

