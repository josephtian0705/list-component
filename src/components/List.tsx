import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {ListItemText , Button, Grid, Input, InputBase} from '@material-ui/core';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    buttonStyle: {
        textAlign: 'center',
        fontSize: '15px',
        marginLeft: '10px'
    },
    textStyle: {
        fontSize: '20px',
    },
    inputSize: {
        height: '30px',
        width: '200px',
        fontSize: '20px'
    },
    marginSpace: {
        margin: '10px'
    }
  }
  ));

function List(props: any) {
    const [editInput, setEditInput] = useState('');
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const inputTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditInput(e.target.value);
    };
    
    const editHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const index = props.lists.findIndex((list: any) => {
            return list.id === props.list.id;
        });
        const list = Object.assign({}, props.lists[index]);
        list.text = editInput;

        const lists = Object.assign([], props.lists);
        lists[index] = list;

        props.setLists(lists);
        localStorage.setItem('lists', JSON.stringify(lists));
        setOpen(false);
        e.preventDefault();
    }

    const keyPress = (e: KeyboardEvent<HTMLFormElement>) => {
        if(editInput !== ''){
            if(e.charCode === 13){
                const index = props.lists.findIndex((list: any) => {
                    return list.id === props.list.id;
                });
                const list = Object.assign({}, props.lists[index]);
                list.text = editInput;
        
                const lists = Object.assign([], props.lists);
                lists[index] = list;
        
                props.setLists(lists);
                localStorage.setItem('lists', JSON.stringify(lists));
                setOpen(false);
            }
        }
    }

    const deleteHandler = () =>{
        // props.setLists(
        //     props.lists.filter((element: any) => element.id !== props.list.id)
        // );
        const index = props.lists.findIndex((list: any) => {
            return list.id === props.list.id;
        });
        const list = Object.assign({}, props.lists[index]);
        const lists = Object.assign([], props.lists);

        const filteredItems = lists.filter((list: any) => {
            return list !== lists[index];
        });
        
        props.setLists(filteredItems);
        localStorage.setItem('lists', JSON.stringify(filteredItems));
    }

    return (
        <div className="list">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form onKeyPress={keyPress}>
                            {console.log(props.list.text)}

                        <input className={classes.inputSize} defaultValue={props.list.text} onChange={inputTextHandler} />
                            <Button className={classes.buttonStyle} variant='outlined' onClick={editHandler}>確認</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>

            <Grid className={classes.marginSpace} container direction='row'>
                <ListItemText className={classes.textStyle} primary={props.list.text} />
                <Button className={classes.buttonStyle} variant='outlined' onClick={handleOpen}>編集</Button>
                <Button className={classes.buttonStyle} variant='outlined' onClick={deleteHandler}>削除</Button>
            </Grid>
        </div>
    );
}

export default List;
