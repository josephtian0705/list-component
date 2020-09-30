import React, { useState } from 'react';
import ListForm from './components/ListForm';
import Lists from './components/Lists';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Card } from '@material-ui/core';
import use-sound from 'use-sound';

const useStyles = makeStyles({
  boxArea: {
    height: '100%',
    maxHeight: '100%',
    width: '600px',
    margin: '100px',
    padding: '10px',
    borderRadius: '20px',
  }
});

function App() {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [lists, setLists] = useState([
    {id: 1, text: "List Object 1"},
    {id: 2, text: "List Object 2"},
    {id: 3, text: "List Object 3"},
    {id: 4, text: "List Object 4"},
    {id: 5, text: "List Object 5"},
  ]);

  if(localStorage.getItem('lists') === null){
    localStorage.setItem('lists',JSON.stringify(lists));
  }

  const localStorageLists = JSON.parse(localStorage.getItem('lists')!);
  const arrayLists = Array.from(localStorageLists);

  return (
    <div className="App">            
      <Container>
        <Grid container direction='row' justify='center'>
        <Card className={classes.boxArea}>
          <Box>
              <ListForm 
                lists={lists} 
                setLists={setLists} 
                inputText={inputText} 
                setInputText={setInputText}/>
              <Lists setLists={setLists} lists={arrayLists}/>
          </Box>
        </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
