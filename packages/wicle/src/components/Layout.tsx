import React, { ReactElement } from 'react'

type LayoutProps = {
    children: ReactElement | ReactElement[]
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <div id="wall" className="absolute w-full -z-10 h-lvh border-4 border-red-600">
            </div>
            <div id="navbar" className='block bg-sky-700 w-full'>Nav</div>
            <div id="container" className='flex flex-row max-w-7xl mx-auto'>
                <div id="sidebar" className='basis-80 border min-h-80 bg-slate-500'>Sidebar</div>
                <div id="content" className='grow bg-orange-200'>
                    {children}
                </div>
            </div>
            <div id="footer" className='block bg-zinc-600 text-slate-50 text-center'>Footer</div>
        </>
    )
}
