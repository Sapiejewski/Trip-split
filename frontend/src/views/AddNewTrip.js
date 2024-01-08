import React, { useEffect, useState } from "react"
import { Link, Router, useNavigate } from "react-router-dom"

import { Checkbox } from "@nextui-org/react"

import { Input, Button } from "@nextui-org/react"

const AddNewTrip = () => {
	const url = process.env.API_URL
	console.log(url)
	const [checkbox, setCheckbox] = useState(true)
	const [trip, setTrip] = useState({
		name: "",
		date_start: "",
		date_end: "",
	})
	const [formatedTrip, setFormatedTrip] = useState({
		name: "",
		date_start: "",
		date_end: "",
	})
	const handleDateChange = (e, key) => {
		const [year, month, day] = e.target.value.split("-")
		const formattedDateResult =
			year && month && day ? `${year}-${month}-${day}` : ""
		setFormatedTrip(prevState => ({
			...prevState,
			[key]: formattedDateResult,
		}))
		setTrip(prevState => ({ ...prevState, [key]: e.target.value }))
	}
	const navigate = useNavigate()

	const handleClick = e => {
		e.preventDefault()
		fetch("http://localhost:8000/trip/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formatedTrip),
		})
		navigate("/")
	}
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
							onChange={e => {
								setTrip(prevState1 => ({
									...prevState1,
									name: e.target.value,
								}))
								setFormatedTrip(prevState2 => ({
									...prevState2,
									name: e.target.value,
								}))
							}}
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
									onChange={e => {
										console.log(e.target.value)
										handleDateChange(e, "date_start")
									}}
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
									onChange={e => {
										console.log(e.target.value)
										handleDateChange(e, "date_end")
									}}
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
