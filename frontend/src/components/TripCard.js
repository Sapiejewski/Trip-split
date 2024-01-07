import React from "react"
import img from "./img.jpg"
const TripCard = () => {
	return (
		<div className="flex flex-col items-start shadow-md rounded py-[16px] px-[16px] w-1/5 mb-4">
			<dic className="flex flex-col items-start justify-end">
				<h2 className="font-bold text-xl">Narty we włoszech</h2>
				<div>X zakupów</div>
			</dic>
			<div>
				<img
					src={img}
					alt="dolomity"
					className="aspect-video rounded-lg shadow-lg h-auto max-w-full"></img>
			</div>
		</div>
	)
}

export default TripCard
