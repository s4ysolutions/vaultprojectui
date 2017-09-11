import React from 'react';
import PropTypes from 'prop-types';

const _Folders = ({ folders }) => 
    <List>
      { folders.map((folder,i)=>
        <ListItem key={"f"+i}>
        <Avatar>
            <FolderIcon />
            <ListItemText>{folder}</ListItemText>
          </Avatar>
        </ListItem>
      }
    </List>
