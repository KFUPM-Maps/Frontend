import React from "react";

const Loading = ({ message = "Loading..." }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[150px] w-full">
			<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-border mb-4"></div>
			<span className="text-text text-lg font-medium">{message}</span>
		</div>
	);
};

export default Loading;
