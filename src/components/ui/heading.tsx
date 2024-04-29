interface HeadingProps {
    title: string
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
    )
}

export default Heading
