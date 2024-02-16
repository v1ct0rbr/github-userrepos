import { Outlet } from 'react-router-dom'


export function AppLayout() {
    return (
        <>
            <main className="flex-grow flex flex-col">
                <div className="container px-4 md:px-8 flex-grow flex flex-col">
                    <Outlet />
                </div>
            </main>

        </>
    )
}
