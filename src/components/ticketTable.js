import { Tab } from '@headlessui/react'
import { Edit } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Chip } from "@mui/material";



const TicketTable = ({tickets}) => {
  console.log(tickets);
  const router = useRouter();
  return (
  <>
    <h1 className="my-4 font-bold">
      <Chip label={tickets.length} color="primary" className="px-1"></Chip> Tickets Found
    </h1>
    <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              tickets.map((ticket) => (
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
                    <Edit onClick={() => router.push(`/tickets/update/${ticket.id}`)}/>
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