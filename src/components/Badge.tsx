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

export default function Badge({content, size='text-xs'}: {content: string, size?: string}){
    if(!bgColorClassByContent.hasOwnProperty(content)){
        const bgColor = lightBrightBgColorClasses[Math.floor(Math.random() * lightBrightBgColorClasses.length)];
        bgColorClassByContent[content] = bgColor;
    }
    return (
        <div className={`font-light max-w-44 px-1 ${size} border border-primary ${bgColorClassByContent[content]} text-primary-content border-opacity-50 rounded-xl capitalize whitespace-nowrap text-ellipsis overflow-hidden shadow-slate-400 glass`}>{content}</div>
    )
}