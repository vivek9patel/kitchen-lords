export function Error({message}: {message:string}) {
    return (
        <div className="toast">
            <div className={`alert alert-error`}>
                <span className="text-white">{message}</span>
            </div>
        </div>
    )
}

export function Info({message}: {message:string}) {
    return (
        <div className="toast">
            <div className={`alert alert-info`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export function Success({message}: {message:string}) {
    return (
        <div className="toast">
            <div className={`alert alert-success`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export function Warning({message}: {message:string}) {
    return (
        <div className="toast">
            <div className={`alert alert-warning`}>
                <span>{message}</span>
            </div>
        </div>
    )
}