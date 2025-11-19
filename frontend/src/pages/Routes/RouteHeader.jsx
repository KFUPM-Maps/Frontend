export default function RouteHeader({type, setType}){
    const selectedStyle = "bg-primary p-2 px-4 rounded-2xl"
    const notSelectedStyle = "bg-bg p-2 px-4 rounded-2xl"

    const handelClick = (e)=>{
        setType(e.target.textContent);
    }

    return (
    <div className="flex gap-2 border-border border-t-highlight border justify-around items-center w-10/12 mt-5 bg-bg-light rounded p-2 px-4 select-none">
        <span className={(type ==="Pending")?selectedStyle:notSelectedStyle} onClick={handelClick}>Pending</span>
        <span className={(type ==="Approved")?selectedStyle:notSelectedStyle} onClick={handelClick}>Approved</span>
        <span className={(type ==="Rejected")?selectedStyle:notSelectedStyle} onClick={handelClick}>Rejected</span>
    </div>)
}