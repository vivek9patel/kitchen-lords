const bgColorClassByContent: {
    [key: string]: string;
} = {}

const lightBrightBgColorClasses = [
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-purple-100',
    'bg-pink-100',
]

export default function Badge({content}: {content: string}){
    if(!bgColorClassByContent.hasOwnProperty(content)){
        const bgColor = lightBrightBgColorClasses[Math.floor(Math.random() * lightBrightBgColorClasses.length)];
        bgColorClassByContent[content] = bgColor;
    }
    return (
        <div className={`font-light text-xs px-1 border border-primary ${bgColorClassByContent[content]} text-primary-content border-opacity-50 rounded-xl capitalize max-w-44 whitespace-nowrap text-ellipsis overflow-hidden`}>{content}</div>
    )
}