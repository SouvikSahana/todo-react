import { Avatar, Input, List, ListItem, ListItemAvatar, ListItemText,  Modal,FormControl, InputLabel, Button  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Todo.css'
import {MdDeleteForever} from 'react-icons/md'
import {FiEdit3} from 'react-icons/fi'
import db from './firebase'
import {GrDocumentUpdate} from 'react-icons/gr'
import image from "./bini1.jpeg"

const Todo = ({text}) => {
let time= new Date((text.time?.seconds+19800)*1000).toUTCString()
const length=time?.length;
time=time?.substr(0,length-3);

  const [updateInput,setUpdateInput]=useState("")
  const [open,setOpen]=useState(false)
  const updateTodo=()=>{
    if(updateInput==""){
      alert("You can't save empty value")
    }else{
    db.collection('todos').doc(text.id).set({
      todo:updateInput
    },{merge:true});
    setOpen(false)}
  }
  useEffect(()=>{
if(open===false){setUpdateInput("")}
  },[open])
  return (
    <>
    <Modal
    open={open}
    onClose={e=> setOpen(false)}
    className="modal_main"
    >
      <div className='modal'>
        <br />
      <FormControl >
      <InputLabel className='heading'>Update file</InputLabel>
      <Input value={updateInput} multiline onClick={()=>{setUpdateInput(text.todo)}} onChange={e=> setUpdateInput(e.target.value)} className="input"/>
      <Button className='update_btn' onClick={updateTodo}><GrDocumentUpdate className='update'/>UPDATE</Button>
    </FormControl>
   
    
      </div>
    </Modal>
    <List  className='list'>
        <ListItem>
            <ListItemAvatar>
                <Avatar alt="Souvik Sahana"
  src={image}/>
            </ListItemAvatar>
            <ListItemText primary={time} secondary={text.todo} className="text"/>
            < FiEdit3 className='edit' onClick={e=> setOpen(true)}/>
            <MdDeleteForever onClick={e=> db.collection('todos').doc(text.id).delete()} className='icon'/>
        </ListItem>
     
    </List>
    </>
  )
}

export default Todo