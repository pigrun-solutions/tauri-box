import { Button } from './button'

const NoProducts = ({ title, addNew }: { title: string; addNew: () => void }) => {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">You have no {title}</h3>
                <p className="text-sm text-muted-foreground">You can see the data table as soon as you add a product.</p>
                <Button className="mt-4" onClick={addNew}>
                    Add {title}
                </Button>
            </div>
        </div>
    )
}

export default NoProducts
