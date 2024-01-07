import React from "react"
import Navbar from "./Navbar"
import { Link, Router } from "react-router-dom"
import Footer from "./Footer"

const AddNewTrip = () => {
	return (
		<Router>
			<div>
				<Navbar />
				<div className="flex items-center justify-center mt-10 ">
					<div className="flex flex-col items-center justify-between w-11/12  gap-y-5">
						<div className="flex flex-row justify-between w-5/6 items-center">
							<h1 className="text-xl font-bold">Moje Wyjazdy</h1>
							<Link to="/AddNewTrip">
								<button className="bg-secondary text-[#FFFFFF] flex justify-center items-center py-[10px] shadow-md shadow-secondary  rounded-lg   px-[20px]">
									+ Nowy wyjazd
								</button>
							</Link>
						</div>
						<div className="flex flex-wrap flex-row justify-center gap-x-5">
							{/* <TripCard /> */}
						</div>
					</div>
				</div>
				<Footer />
			</div>
			{/* <Route path="/AddNewTrip" component={AddNewTrip}/> */}
		</Router>
	)
}

export default AddNewTrip
