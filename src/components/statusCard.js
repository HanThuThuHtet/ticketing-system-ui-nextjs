import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const StatusCard = ({id,title,allTickets}) => {

  const [numOfTickets,setNumOfTickets] = useState(null);
  const [cardStyle,setCardStyle] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/statuses/${id}`,
    {
      method: 'GET',
      headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
      setNumOfTickets(result.data.tickets.length);
      setCardStyle(getColorById(id));
      console.log('Card Style',cardStyle);
    })
      .catch(err => {
      console.log("Error Fetching Status:",err);
    })
  },[id]);

  const getColorById = (id) => {
    switch (id) {
      case "1":
        return { backgroundColor: '#c5e1a5', color: '#1b5e20' };
      case "2":
        return { backgroundColor: '#fff9c4', color: '#ffc107' }; 
      case "3":
        return { backgroundColor: '#f3e5f5', color: '#673ab7' }; 
      default:
        return { backgroundColor: '#e0f7fa', color: '#01579b' }; 
    }
  }

  return (
    <>
      {allTickets ? (
        <Link href={`/tickets/`} passHref>
        <Card sx={{ minWidth: 250, backgroundColor: '#e0f7fa', color: '#01579b' }}>
          <CardContent>
            <Typography variant="h6" component="div" textAlign='center'>
              {title}
            </Typography>
            <Typography variant="h5"  textAlign='center' sx={{ fontWeight: 'bold' }}>
              {allTickets}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      ) : 
      <Link href={`/statuses/${encodeURIComponent(id)}`} passHref>
      <Card sx={{ minWidth: 250, ...cardStyle }}>
        <CardContent>
          <Typography variant="h6" textAlign='center' component="div">
            {title}
          </Typography>
          <Typography variant="h5" textAlign='center' sx={{ fontWeight: 'bold' }}>
            {numOfTickets}
          </Typography>
        </CardContent>
      </Card>
    </Link> 
    }
    </>
  );
};

export default StatusCard;
