import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout.js'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export function ButtonSample() {
    return (
        <Stack spacing={2} direction="column">
            <Stack spacing={2} direction="row">
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
            </Stack>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color='primary'>Primary</Button>
                <Button variant="contained" color='secondary'>Secondary</Button>
                <Button variant="contained" color='success'>Success</Button>
                <Button variant="contained" color='info'>Info</Button>
                <Button variant="contained" color='warning'>Warning</Button>
                <Button variant="contained" color='error'>Error</Button>
                <Button variant="contained" color='inherit'>Inherit</Button>
                <Button variant="contained" color='primary' disabled>Disabled</Button>
            </Stack>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color='primary' size="small">Small</Button>
                <Button variant="contained" color='primary' size="medium">Medium</Button>
                <Button variant="contained" color='primary' size="large">Large</Button>
            </Stack>
        </Stack>)
}

export function Home() {
    return (
        <Layout>
            <h1 className='text-3xl font-semibold'>Wicle Demo</h1>
            <ButtonSample />
        </Layout>
    )
}

const app = document.getElementById('app')
if (app) {
    const root = ReactDOM.createRoot(app)
    root.render(<Home />)
}

