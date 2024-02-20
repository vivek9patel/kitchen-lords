export default function Page({ params }: { params: { kitchen: string } }) {
    return <div>My Kitchen: {params.kitchen}</div>
}