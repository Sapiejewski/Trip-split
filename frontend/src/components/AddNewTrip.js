import React from "react"
import Navbar from "./Navbar"
import { Link, Router } from "react-router-dom"
import { Input } from "@nextui-org/react"

import Footer from "./Footer"

const AddNewTrip = () => {
	return (
		<div className="flex flex-col items-center justify-between w-11/12 mt-10 mb-40 gap-y-5">
			<div className="flex flex-row justify-between w-5/6 items-center">
				<Link to="/AddNewTrip">
					<button className="bg-success text-[#FFFFFF] flex justify-center items-center py-[10px] shadow-md shadow-secondary  rounded-lg   px-[20px]">
						Cofnij
					</button>
				</Link>
				<h1 className="text-xl font-bold">Nowy wyjazd</h1>
			</div>
			<div className="flex flex-wrap flex-row justify-center gap-x-5">
				<form>
					<div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-4">
						<div clas>
							<h1 className="font-bold text-lg">Podaj nazwę wyjazdu </h1>
							<Input
								type="text"
								label="Nazwa Wyjazdu"
								classNames={{ input: "bg-default" }}
								// variant="underlined"
								// className="bg-default"
							/>
						</div>
						<div>
							<h1 className="font-bold text-lg">Datę rozpoczęcia </h1>
							<Input
								type="date"
								label="Data rozpoczęcia"
								classNames={{ input: "bg-default" }}
								placeholder=""
								// variant="underlined"
								// className="bg-default border"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddNewTrip
