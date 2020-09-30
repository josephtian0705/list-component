import React from 'react';
import List from './List';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyle: {
        textAlign: 'center',
        width: '128px',
        fontSize: '20px',
    },
});

function Lists(props: any){
    const classes = useStyles();
    // const localStorageLists = JSON.parse(localStorage.getItem('lists')!);
    // const arrayLists = Array.from(localStorageLists);
    return(
        <Container>
            <ul className='todo-list'>
                {/* {arrayLists.map((list: any) => 
                    <List 
                        setLists={props.setLists} 
                        lists={props.lists} 
                        list={list} />
                )} */}
                {
                    props.lists.map((list: any) => 
                    <List 
                        setLists={props.setLists} 
                        lists={props.lists} 
                        list={list} />
                )
                }
            </ul>
        </Container>
    );
}

export default Lists;
