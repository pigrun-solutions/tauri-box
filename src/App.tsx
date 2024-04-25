// import { useEffect, useState } from 'react'
// import { Button } from './components/ui/button'
// import Database from 'tauri-plugin-sql-api'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useAuth } from './hooks/use-auth'


const router = createRouter({ routeTree, context: undefined! })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    const authentication = useAuth()
    return <RouterProvider router={router} context={{ authentication }} />

    // const [additives, setAdditives] = useState<Additive[] | undefined>()
    // useEffect(() => {
    //     const checkDb = async () => {
    //         const db = await Database.load('sqlite:test.db')

    //         await db.execute(
    //             `CREATE TABLE IF NOT EXISTS Additives (id TEXT PRIMARY KEY,  name TEXT UNIQUE, costKg REAL DEFAULT 0.00, densityGmCc REAL DEFAULT 1.00, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`
    //         )

    //         const rows = (await db.select('SELECT * FROM Additives')) as Additive[]
    //         setAdditives(rows)
    //     }

    //     checkDb()
    // }, [])

    // return (
    //     <div className="h-screen w-full bg-muted/40">
    //         Add new additives
    //         <Button
    //             onClick={async () => {
    //                 const db = await Database.load('sqlite:test.db')
    //                 await db.execute(`INSERT INTO Additives (id, name) VALUES ('${Math.random()}', 'Additive ${Math.random()}')`)
    //                 const rows = (await db.select('SELECT * FROM Additives')) as Additive[]
    //                 setAdditives(rows)
    //             }}>
    //             Add
    //         </Button>
    //         <div>
    //             {additives &&
    //                 additives?.map((additive: any) => (
    //                     <div key={additive.id}>
    //                         {additive.name} - {additive.costKg}
    //                     </div>
    //                 ))}
    //         </div>
    //     </div>
    // )
}

export default App
