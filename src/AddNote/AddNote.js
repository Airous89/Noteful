import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NoteContext from '../notes-context';
import './AddNote.css';
import Config from '../config'

export default class AddNote extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      name: '',
      content: '',
      id: '',
      nameValid: false,
      idValid: false,
      validationMessage: '',
      validationMessage1: '',
      validationMessage2: '',
      validationMessage3: ''
    };
  }
  static contextType = NoteContext;
  static defaultProps = {
    folders: []
  };

  isNameValid = event => {
    event.preventDefault();
    if (!this.state.name) {
      this.setState({
        validationMessage1: ' A Note can not be blank ',
        nameValid: false
      });
    } if (!this.state.id){
      this.setState({
        validationMessage2: 'Pick a folder',
        nameValid: false

      })
    }
    if (!this.state.name ||!this.state.id){
      return;
    } else {
      this.handleAddNote();
    }
  };

  handleAddNote = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // id: cuid(),
        name: this.state.name,
        modified: new Date(),
        folderId: this.state.id,
        content: this.state.content
      })
    };

    fetch(`${Config.API_ENDPOINT}/notes`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddNote(data);
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  nameChange = letter => {
    this.setState({ name: letter });
  };

  contentChange = letter => {
    this.setState({ content: letter });
  };

  idChange = letter => {
    this.setState({ id: letter });
  };

  render() {
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm
          onSubmit={event => {
            this.isNameValid(event);
          }}
        >
          <div className='field'>
            <label htmlFor='note-name-input'>Name</label>
            <input
              type='text'
              id='note-name-input'
              name='note'
              onChange={event => {
                this.nameChange(event.target.value);
              }}
            />
          </div>
          {!this.state.nameValid && (
            <div>
              <p>{this.state.validationMessage1}</p>
            </div>
          )}
          <div className='field'>
            <label htmlFor='note-content-input'>Content</label>
            <textarea
              id='note-content-input' required
              name='content'
              onChange={event => {
                this.contentChange(event.target.value);
              }}
            />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>Folder</label>
            <select
              id='note-folder-select'
              name='folder'
              onChange={event => {
                this.idChange(event.target.value);
              }}
            >
              <option value>...</option>
              {this.context.folders.map(folder => (
                <option key={folder.name} name='folder' value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            {!this.state.nameValid && (
              <div>
                <p>{this.state.validationMessage2}</p>
              </div>
            )}
          </div>
          <div className='buttons'>
            <button type='submit'>Add note</button>
          </div>
        </NotefulForm>
        {this.state.error && (
          <div>
            <p>{this.state.error}</p>
          </div>
        )}
      </section>
    );
  }
}