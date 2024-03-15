import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout.js'

export function Home() {
    return (
        <Layout>
            <h1 className='text-3xl font-semibold'>Wicle Demo</h1>
        </Layout>
    )
}

const app = document.getElementById('app')
if (app) {
    const root = ReactDOM.createRoot(app)
    root.render(<Home />)
}

