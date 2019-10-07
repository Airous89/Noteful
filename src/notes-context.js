import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  err: null,
  HandleDelete: () => {},
  HandleAddFolder: () => {},
  HandleAddNote: () => {}
});

export default NoteContext;