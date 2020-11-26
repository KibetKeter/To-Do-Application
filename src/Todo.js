import React, { useState } from 'react'
import { Button,Avatar, List , ListItem, ListItemAvatar, ListItemText, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import "./Todo.css";
import db from './firebase.js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



function Todo(props) {
    //  Update Function
    const updateTodo = () =>
    {
        // Update ToDo with new Input text
        db.collection('todos').doc(props.todo.id).set(
                                                        {
                                                            todo:input
                                                        },
                                                        {merge:true})
        setOpen(false)
    }

    const [input,setInput] = useState ();
    // Setting the react hook as a variable
    const classes = useStyles();
    // Setting the Modal to open when the user clicks the edit button
    const[open,setOpen] = useState(false);

            const handleOpen = () => 
            {
                setOpen(true);
            };

    return (
        <>
            <Modal
                        open={open}
                        onClose={event => setOpen(!true)}
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                >
                <Fade in={open}>
                        <div className = {classes.paper}> 
                            <h1>Edit todo</h1>
                            <TextField id="standard-textarea"   multiline  placeholder= {props.todo.todo} value = {input} onChange={event => setInput(event.target.value)}/><br/><br/>
                                <Button variant="contained" color="secondary" onClick = {updateTodo}> Update</Button>
                        </div>
                </Fade>
            </Modal>


        <List className = "todo__list" >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary = {props.todo.todo} secondary="Needs to be done👈🏿"/>
            </ListItem>
            <div className = "buttons">
                <Button className="buttons__edit" variant="outlined" color="primary" onClick= {event => setOpen(true)}> Edit</Button>
                <Button className="buttons__delete" variant="outlined" color="secondary" onClick= {event =>  db.collection('todos').doc(props.todo.id).delete()}>DELETE ME</Button>
            </div>
        </List>
        </>
    )
}
export default Todo
