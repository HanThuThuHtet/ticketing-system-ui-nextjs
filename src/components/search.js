import { Cancel, CancelOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react'

const Search = ({onSearch}) => {
    const [ticketId , setTicketId] = useState('');
    
    const handleSearch = () => {
        onSearch(ticketId);
    }
    const handleCancel = () => {
        setTicketId('');
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); 
          handleSearch();
        }
      };
  return (
    <>
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >

        <InputBase
            sx={{ ml: 1, flex: 1 }}
            type='text'
            placeholder='Ticket ID'
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            onKeyDown={handleKeyPress}
        />

        {ticketId ? (
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            onClick={handleCancel}
          >
            <CancelOutlined />
          </IconButton>
        ) :
        <IconButton 
                type="button" sx={{ p: '10px' }} 
                onClick={handleSearch} 
        >
                <SearchOutlined />
        </IconButton>
        }
        
    </Paper>


    </>
  )
}

export default Search