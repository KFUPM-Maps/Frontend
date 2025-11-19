

export default function RouteItem({route, children}){
    return(
    <div key={route.id} id={"route" + route.id} className="flex flex-col border-1 border-border bg-bg-light rounded p-2">
        <div className="flex justify-between">
            <h1 className="text-xl md:text-2xl">{route.title}</h1>
            <div>
                {children}
            </div>
        </div>
        <div className="flex justify-between items-center text-text-muted">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-bg-light border border-border flex items-center justify-center overflow-hidden">
                    {route.user.picture ? (
                    <img
                        src={route.user.picture }
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <span className="material-symbols-rounded text-5xl text-text-muted">
                        account_circle
                    </span>
                    )}
                </div>
                <span>{route.user.firstName + " " + route.user.lastName}</span>
            </div>
            <div className="text-right flex gap-1">
                <span className="hidden md:inline">last updated:</span>
                <span>
                    {route.lastUpdated}
                </span>
            </div>
        </div>
    </div>
    )
}