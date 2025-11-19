export default function Stars({route}){
    return (
        <div className="flex items-center text-text-muted text-2xl">
            <i className="material-icons">star</i>
            <span>#{route.starsCount}</span>
        </div>
    )
}