import { useState } from "react"

export default function Steps({route, setRoute}){
    const [draggedIndex, setDraggedIndex] = useState(null);

    const stepsArr = Object.entries(route.steps)
        .sort(([aKey], [bKey]) => parseInt(aKey) - parseInt(bKey))
        .map(([id, step]) => ({ id, ...step }));

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (dropIndex) => {
        if (draggedIndex === null) return;

        const newStepsArr = [...stepsArr];
        const [moved] = newStepsArr.splice(draggedIndex, 1);
        newStepsArr.splice(dropIndex, 0, moved);

        const newStepsObj = {};
        newStepsArr.forEach((step, i) => {
            newStepsObj[i + 1] = { photo: step.photo, caption: step.caption };
        });

        setRoute(prev => ({ ...prev, steps: newStepsObj }));
        setDraggedIndex(null);
    };

    const handleCaptionChange = (e) => {
        const id = e.target.closest('[id*="step"]').id.replace("step", "");

        setRoute(prev => ({
            ...prev,
            steps: {
                ...prev.steps,
                [id]: {
                    ...prev.steps[id],
                    caption: e.target.value
                }
            }
        }));
    };


    return(            
        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden w-full">
            {stepsArr.map((step, index) => (
                    <div
                    key={step.id}
                    id={"step"+step.id}
                    className="flex items-center p-4 gap-1 bg-bg-light border border-border rounded select-none hover:bg-primary transition"
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    >
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            className="flex flex-col justify-center items-center cursor-grab"
                        >
                            <div className="w-5 h-0.5 bg-text mb-1 rounded"></div>
                            <div className="w-5 h-0.5 bg-text mb-1 rounded"></div>
                            <div className="w-5 h-0.5 bg-text rounded"></div>
                        </div>
                        <img
                            src={step.photo}
                            alt="step"
                            className="w-6 h-6 object-cover rounded"
                        />
                        <input className="text-tex grow max-w-full bg-bg border border-border" type="text" value={step.caption} onChange={handleCaptionChange}/>
                    </div>
                ))}
        </div>)
}