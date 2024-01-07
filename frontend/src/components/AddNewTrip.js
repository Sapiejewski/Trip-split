import React, { useEffect, useState } from "react"
import { Link, Router, useNavigate } from "react-router-dom"

import { Checkbox } from "@nextui-org/react"

import { Input, Button } from "@nextui-org/react"

const AddNewTrip = () => {
	const [trip, setTrip] = useState({
		name: "",
		date_start: new Date(),
		date_end: new Date(),
	})
	const navigate = useNavigate()

	const handleClick = e => {
		e.preventDefault()
		navigate("/")
		// fetch()
	}
	const [checkbox, setCheckbox] = useState(true)
	return (
		<div className="flex flex-col items-center justify-between w-11/12 mt-10 mb-40 gap-y-5">
			<div className="flex flex-row justify-between w-5/6 items-center">
				<Link to="/">
					<button className="bg-success text-[#FFFFFF] flex justify-center items-center py-[10px]   rounded-lg   px-[20px]">
						Cofnij
					</button>
				</Link>
				<h1 className="text-xl font-bold">Nowy wyjazd</h1>
			</div>
			<div className="flex flex-wrap flex-row justify-center gap-x-5 w-1/4">
				<form className="flex w-full justify-center items-start  flex-col flex-wrap md:flex-nowrap gap-4 ">
					<div className="w-full">
						<h1 className="font-bold text-lg">Podaj nazwę wyjazdu </h1>
						<Input
							value={trip.name}
							onValueChange={setTrip}
							size="lg"
							type="text"
							label="Nazwa Wyjazdu"
							variant="bordered"
							className="w-full"
							classNames={{ input: "bg-background" }}
						/>
					</div>
					<Checkbox
						isSelected={checkbox}
						onValueChange={setCheckbox}
						defaultSelected>
						Czy chcesz dodawać daty?
					</Checkbox>
					{checkbox && (
						<div className="flex flex-row w-full justify-between items-center">
							<div>
								<h1 className="font-bold text-lg">Data rozpoczęcia </h1>
								<Input
									value={trip.date_start}
									onValueChange={setTrip}
									size="lg"
									type="date"
									variant="bordered"
									classNames={{ input: "bg-background" }}
								/>
							</div>
							<div>
								<h1 className="font-bold text-lg">Data zakończenia</h1>
								<Input
									value={trip.date_end}
									onValueChange={setTrip}
									size="lg"
									type="date"
									variant="bordered"
									classNames={{ input: "bg-background" }}
								/>
							</div>
						</div>
					)}
					<Button color="secondary" onClick={handleClick} className="w-full">
						Dodaj nowy wyjazd
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AddNewTrip
