function getInitials(name: string) {
    return name.split(' ').map((word) => word[0]).join('').toUpperCase();
}

const bgColorClassByContent: {[content: string]: string} = {};

const darkBrightBgColorClasses = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-neutral',
    'bg-neutral-darker',
    'bg-neutral-darkest',
    'bg-neutral-lighter',
    'bg-neutral-lightest',
    'bg-success',
    'bg-warning',
    'bg-error',
    'bg-info',
    'bg-neutral-content',
    'bg-primary-content',
    'bg-secondary-content',
    'bg-accent-content',
    'bg-success-content',
    'bg-warning-content',
    'bg-error-content',
    'bg-info-content',
]

export default function UserAvatar({photoURL, displayName, isGod}: {photoURL: string, displayName: string, isGod?: boolean}) {
    if(!bgColorClassByContent.hasOwnProperty(displayName)){
        const bgColor = darkBrightBgColorClasses[Math.floor(Math.random() * darkBrightBgColorClasses.length)];
        bgColorClassByContent[displayName] = bgColor;
    }
    const godClass = isGod ? "border-2 border-accent" : "";
    if(photoURL) {
            return (<div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-circle avatar border-2 ${godClass} md:btn-md btn-sm`}
            >
                <div className="md:w-10 w-8 rounded-full">
                <img
                    alt="User Avatar"
                    src={photoURL}
                />
                </div>
            </div>)
    }
    else if(displayName){
        return (
            <div tabIndex={0} role="button" className={`btn btn-ghost btn-circle avatar placeholder md:btn-md btn-sm`}>
                <div className={`bg-neutral text-neutral-content rounded-full md:w-10 w-8 ${bgColorClassByContent[displayName]}`}>
                    <span className="md:text-xl text-lg">{getInitials(displayName)}</span>
                </div>
            </div> 
        )
    }

    return null;
}