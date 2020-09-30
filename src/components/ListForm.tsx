import React,{ChangeEvent, MouseEvent, KeyboardEvent, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
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
    marginSpacing: {
        margin: '10px'
    }
});

function ListForm(props: any) {
    
    const classes = useStyles();

    const inputTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setInputText(e.target.value);
    };

    const submitListHandler = (e: MouseEvent<HTMLButtonElement>) => {

        if(props.inputText != ''){
            const listObject = {id: Math.random() * 10000, text: props.inputText};
            const localStorageList = JSON.parse(localStorage.getItem('lists')!);
            const arrayLists = [...localStorageList];
            arrayLists.push(listObject);
            props.setLists(arrayLists);
            props.setInputText('');
            localStorage.setItem('lists', JSON.stringify(arrayLists));
            e.preventDefault();
        }
    }

    const keyPress = (e: KeyboardEvent<HTMLFormElement>) => {
        if(e.charCode === 13){
            if(props.inputText != ''){
                const listObject = {id: Math.random() * 10000, text: props.inputText};
                const localStorageList = JSON.parse(localStorage.getItem('lists')!);
                const arrayLists = [...localStorageList];
                arrayLists.push(listObject);
                props.setLists(arrayLists);
                localStorage.setItem('lists', JSON.stringify(arrayLists));
            }
        }
    }

    return (
        <div>
            <form className="list-form" onKeyPress={keyPress}>
            <Grid className={classes.marginSpacing}>
                <input
                    className={classes.textStyle}
                    type="text" 
                    value={props.inputText}
                    onChange={inputTextHandler}
                />
                <Button className={classes.buttonStyle} variant="outlined" onClick={submitListHandler}>
                    追加
                </Button>
            </Grid>
            </form>
        </div>
    )
}

export default ListForm;
