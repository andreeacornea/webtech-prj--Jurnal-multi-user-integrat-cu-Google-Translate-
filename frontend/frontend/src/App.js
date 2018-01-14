
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Message from 'material-ui/svg-icons/communication/message';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Save from 'material-ui/svg-icons/content/save';
import Redo from 'material-ui/svg-icons/content/redo';
import Remove from 'material-ui/svg-icons/content/remove';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

let elementToBeDeleted = -1;
let listaElem = [];

class ListNotes extends Component{

    constructor(props) {
        super(props);

        this.state = {
            titlu: "Note",
            lista: [],
            tradus: "",
            detalii: []
        };
    }

    componentDidMount() {
        axios.get("https://backend-restful-api-andreeac.c9users.io/lists")
            .then(res => {
                const lista = res.data;
                listaElem = lista;
                this.setState({ lista });
            });
        axios.get("https://backend-restful-api-andreeac.c9users.io/notes")
            .then(res => {
                const detalii = res.data;
                this.setState({ detalii });
            });
    }
    
   handleClick(e) {
        var aidi = e.target.parentElement.parentNode.id;
        elementToBeDeleted = aidi;
        console.log(elementToBeDeleted)
        document.getElementById("descriptionField").value = this.state.detalii.filter(word => word.id == aidi)[0].description
        document.getElementById("dateField").value = this.state.detalii.filter(word => word.id == aidi)[0].day
        document.getElementById("nameField").value = e.target.textContent
    }

    render() {
        return (
          <div className="App-intro">
            <Paper className="paper" zDepth={4}>
            <AppBar id="appBar" title="Note existente"
              iconElementLeft={<IconButton><ExpandMore /></IconButton>}>
            </AppBar>
            <List id="listaNote" style={{height: 225, overflow: 'auto'}}>
               {
                 this.state.lista.map(user =>  <ListItem leftIcon={<Message />} 
                      onClick={(e) => this.handleClick(e)} id={user.id}>{user.name}</ListItem>
               )}
            </List>
            </Paper>
         </div>
        );
    }
}

class ButtonsList extends Component {
  
saveInDb(e){
      var maxId = 0;
      for(var i = 0 ; i < listaElem.length; i++){
        if(listaElem[i].id > maxId){
          maxId = listaElem[i].id;
        }
      }
      
      var descriere = document.getElementById("descriptionField").value;
      var data = document.getElementById("dateField").value;
      var nume = document.getElementById("nameField").value;
      var item = { list_id: maxId+1, day:data, description:descriere};

      var parentItem = { name:nume, language:'romana'};
      console.log(parentItem)
      axios.post('https://backend-restful-api-andreeac.c9users.io/lists/', parentItem).then(response => {
        console.log('Response from insert lists: '+response)
      })

      axios.post('https://backend-restful-api-andreeac.c9users.io/notes/', item).then(response => {
        console.log('Response from insert notes: '+response)
      })
      

}

deleteFromnDb(e){
  if(elementToBeDeleted != -1)
  {
      axios.delete('https://backend-restful-api-andreeac.c9users.io/notes/'+elementToBeDeleted).then(response => {
        console.log('Response from delete notes: '+response)
      })
      
      axios.delete('https://backend-restful-api-andreeac.c9users.io/lists/' + elementToBeDeleted).then(response => {
        console.log('Response from delete lists: '+response)
      })
  }
}

edit(e){
      var maxId = 0;
      for(var i = 0 ; i < listaElem.length; i++){
        if(listaElem[i].id > maxId){
          maxId = listaElem[i].id;
        }
      }
      console.log(elementToBeDeleted)
      var arr = document.getElementById('listaNote').childNodes;
      console.log(arr)
      var listaId;
      for(var i = 0 ; i < arr.length; i++){
        if(arr[i].children[0].id == elementToBeDeleted){
           listaId = arr[i].children[0].id;
        }
      }
      var descriere = document.getElementById("descriptionField").value;
      var data = document.getElementById("dateField").value;
      var nume = document.getElementById("nameField").value;
      var item = { list_id: listaId, day:data, description:descriere };

      var parentItem = { name:nume, language:'romana'};
      
        axios.put('https://backend-restful-api-andreeac.c9users.io/notes/'+elementToBeDeleted, item).then(response => {
          console.log('Response from edit notes: '+response)
      })
      
      axios.put('https://backend-restful-api-andreeac.c9users.io/lists/'+elementToBeDeleted, parentItem).then(response => {
          console.log('Response from edit lists: '+response)
      })
}

refresh(e){
      document.getElementById("descriptionField").value = '';
      document.getElementById("descriptionField").placeholder="Descriere"
      
      document.getElementById("dateField").value=''
      document.getElementById("dateField").placeholder="Data: dd/mm/yyyy"
      
      document.getElementById("nameField").value=''
      document.getElementById("nameField").placeholder="Titlu"
      
      document.getElementById("translatedField").value=''
      document.getElementById("translatedField").placeholder="Traducere"
      //console.log(React.ListNotes.forceUpdate())
      window.location.reload();
      console.log('page refreshed')
}

  translate(e){
          var item=document.getElementById("descriptionField").value;
            axios.get("https://backend-restful-api-andreeac.c9users.io/traducere", { params: { val: item}})
            .then(res => {
                document.getElementById("translatedField").value = res.data;
            });
}

  render ()
  {
    return (
      <div>
       <FloatingActionButton className="addButton" onClick={(e) => this.saveInDb(e)}>
      <ContentAdd />
    </FloatingActionButton>
    <FloatingActionButton className="addButton" onClick={(e) => this.edit(e)}>
      <Save />
    </FloatingActionButton>
    <FloatingActionButton className="addButton" onClick={(e) => this.deleteFromnDb(e)}>
      <Remove />
    </FloatingActionButton>
    <FloatingActionButton className="addButton" onClick={(e) => this.refresh(e)} >
      <Redo />
    </FloatingActionButton>
    <RaisedButton className="translate" label="EN" primary={true} id="translateBtn" onClick={(e) => this.translate(e)}>
    </RaisedButton>
    </div>
      )
  }
}

class AddText extends Component {
    constructor(props) {
    super(props);
    this.state = {
      value: 'Descriere'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render ()
  {
    return (
      <Paper className="paper" zDepth={4}>
    <TextField className="textfield" id="nameField"
      placeholder="Titlu"
    />
    <br/>
    <TextField className="textfield" id="dateField"
      placeholder="Data: dd/mm/yyyy"
    />
    <br/>
    <TextField className="textfield" id="descriptionField"
      placeholder="Descriere"
      multiLine={true}
      rows={3}
      ref="descriere"
    />
    </Paper>
      )
  }
  
}


class TranslateText extends Component{
   render ()
  {
    return (
       <Paper className="paper2" zDepth={4}>
    <TextField className="textfield" id="translatedField" placeholder="Traducere" multiLine={true} rows={3}/>
    </Paper>
      )
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Jurnal de activitati</h1>
        </header>
        <div className="sectiuneStanga">
        <ListNotes/>
        <ButtonsList/>
    </div>
    <div className="sectiuneDreapta">
    <AddText/>
    <br></br>
    <br></br>
    <TranslateText/>
    <br></br>
    </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;




