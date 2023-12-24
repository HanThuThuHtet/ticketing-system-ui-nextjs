import { Tab } from '@headlessui/react'
import { ArrowDropDown, Edit } from '@mui/icons-material'
import { Button, InputLabel, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Chip } from "@mui/material";
import { logging } from '../../next.config'

const TicketTable = ({ tickets }) => {
  console.log(tickets);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const statusLabels = {
    '': 'All',
    1: 'New',
    2: 'In Progress',
    3: 'Resolved',
  };

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleStatusChange = (statusId) => {
    setFilterStatus(statusId);
    handleMenuClose();
  }
  const filteredTickets = filterStatus 
                          ? tickets.filter((ticket) => ticket.status_id === filterStatus)
                          : tickets;

  return (
    <>
      <h1 className="my-4 font-bold">
        <Chip label={filteredTickets.length} color="primary" className="px-1"></Chip> Tickets Found
      </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={handleButtonClick}
                >
                  {filterStatus ? statusLabels[filterStatus] : "Status"}
                  <ArrowDropDown />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleStatusChange('')}>All</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(1)}>New</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(2)}>In Progress</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(3)}>Resolved</MenuItem>
                </Menu>
              </TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/tickets/${encodeURIComponent(ticket.id)}`}>
                      {ticket.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {ticket.subject}
                  </TableCell>
                  <TableCell>
                    {ticket.customer}
                  </TableCell>
                  <TableCell>
                    {ticket.status}
                  </TableCell>
                  <TableCell>
                    {ticket.date}
                  </TableCell>
                  <TableCell>
                    <Edit onClick={() => router.push(`/tickets/update/${ticket.id}`)} />
                    {/* <button onClick={() => router.push(`/tickets/update/${ticket.id}`)}>Update Ticket</button> */}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TicketTable