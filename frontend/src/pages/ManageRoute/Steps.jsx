import { useState, useRef } from "react";

export default function Steps({ route, setRoute }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const fileInputs = useRef([]);

  const stepsArr = route.steps;

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;

    let newSteps = [...stepsArr];
    const [movedStep] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(dropIndex, 0, movedStep);

    newSteps = newSteps.map((s, i) => ({ ...s, index: i + 1 }));

    setRoute((prev) => ({ ...prev, steps: newSteps }));
    setDraggedIndex(null);
  };

  const handleCaptionChange = (e, index) => {
    const newSteps = [...stepsArr];
    newSteps[index].caption = e.target.value;
    setRoute((prev) => ({ ...prev, steps: newSteps }));
  };

  const handlePhotoChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newSteps = [...stepsArr];
    newSteps[index].file = file;
    newSteps[index].photo = URL.createObjectURL(file);

    setRoute((prev) => ({ ...prev, steps: newSteps }));
  };

  const removePhoto = (index) => {
    const newSteps = [...stepsArr];
    newSteps[index].file = null;
    newSteps[index].photo = null;
    setRoute((prev) => ({ ...prev, steps: newSteps }));
  };

  const removeStep = (index) => {
    const newSteps = [...stepsArr];
    newSteps.splice(index, 1);
    const reindexed = newSteps.map((s, i) => ({ ...s, index: i + 1 }));
    setRoute((prev) => ({ ...prev, steps: reindexed }));
  };

  return (
    <div className="flex flex-col gap-2 overflow-y-auto w-full">
      {stepsArr.map((step, index) => (
        <div
          key={step.index}
          id={"step" + step.index}
          className="flex items-center p-4 gap-3 bg-bg-light border border-border rounded select-none hover:bg-primary transition"
          onDragOver={handleDragOver}
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

          <div className="flex flex-col items-center w-16">
            <input
              type="file"
              accept="image/*"
              ref={(el) => (fileInputs.current[index] = el)}
              className="hidden"
              onChange={(e) => handlePhotoChange(e, index)}
            />

            {!step.photo ? (
              <button
                className="w-10 h-10 flex items-center justify-center border border-border rounded text-text hover:bg-secondary"
                onClick={() => fileInputs.current[index].click()}
              >
                📤
              </button>
            ) : (
              <>
                <img
                  src={step.photo}
                  alt="step"
                  className="w-12 h-12 object-cover rounded"
                />
                <button
                  className="text-red-400 text-xs mt-1"
                  onClick={() => removePhoto(index)}
                >
                  Remove
                </button>
              </>
            )}
          </div>

          <div className="flex items-center grow gap-2">
            <input
              className="text-text grow bg-bg border border-border px-2 py-1 rounded"
              type="text"
              value={step.caption}
              onChange={(e) => handleCaptionChange(e, index)}
            />
            <button
              className="flex items-center justify-center"
              onClick={() => removeStep(index)}
            >
              <span className="material-symbols-rounded text-3xl">close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
