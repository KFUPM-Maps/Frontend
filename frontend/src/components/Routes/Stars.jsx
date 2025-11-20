export default function Stars({route}){
    return (
        <div className="flex items-center text-text-muted text-2xl">
            <span>{route.starsCount}</span>
            <i className="material-icons">star</i>
        </div>
    )
}