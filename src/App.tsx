import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import Database from 'tauri-plugin-sql-api'

interface Additive {
    id: string
    name: string
    costKg: number
    densityGmCc: number
    createdAt: string
    updatedAt: string
}

const App = () => {
    const [additives, setAdditives] = useState<Additive[] | undefined>()
    useEffect(() => {
        const checkDb = async () => {
            const db = await Database.load('sqlite:test.db')

            await db.execute(
                `CREATE TABLE IF NOT EXISTS Additives (id TEXT PRIMARY KEY,  name TEXT UNIQUE, costKg REAL DEFAULT 0.00, densityGmCc REAL DEFAULT 1.00, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)`
            )

            const rows = (await db.select('SELECT * FROM Additives')) as Additive[]
            setAdditives(rows)
        }

        checkDb()
    }, [])

    console.log(additives)

    return (
        <div className="h-screen w-full bg-muted/40">
            Add new additives
            <Button
                onClick={async () => {
                    const db = await Database.load('sqlite:test.db')
                    await db.execute(`INSERT INTO Additives (id, name) VALUES ('${Math.random()}', 'Additive ${Math.random()}')`)
                    const rows = (await db.select('SELECT * FROM Additives')) as Additive[]
                    setAdditives(rows)
                }}>
                Add
            </Button>
            <div>
                {additives &&
                    additives?.map((additive: any) => (
                        <div key={additive.id}>
                            {additive.name} - {additive.costKg}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default App
