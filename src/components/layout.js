import Navbar from './navbar'
import Footer from './footer'
import { Container } from '@mui/material'

export default function Layout({ children }){
    
    return(
        <>
            <Navbar />
            <Container>
                <main>{children}</main>
            </Container>
            
        </>
    )
}