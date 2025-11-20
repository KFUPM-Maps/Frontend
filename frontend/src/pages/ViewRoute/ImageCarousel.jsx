import { useState } from "react";

export default function ImageCarousel({ images = [], index, setIndex }) {
    

    const next = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    return (
        <div className="w-full max-w-md relative select-none">
            <div className="w-full aspect-[3/4] max-w-md">
                <img
                src={images[index]}
                alt="carousel"
                className="w-full h-full object-cover rounded-xl shadow-md"
                />
            </div>

            <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
            ‹
            </button>


            {/* Right Button */}
            <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
            ›
            </button>
        </div>
    );
}