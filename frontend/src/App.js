import Footer from "./components/Footer.js"
import Navbar from "./components/Navbar.js"
import TripCard from "./components/TripCard.js"
// import { BrowserRouter as Routes, Router, Route, Link } from "react-router-dom"
import AddNewTrip from "./components/AddNewTrip.js"
import { Button } from "@nextui-org/react"

function App() {
	return (
		// <Router>
		<div>
			<Navbar />
			<div className="flex items-center justify-center mt-10 ">
				<div className="flex flex-col items-center justify-between w-11/12  gap-y-5">
					<div className="flex flex-row justify-between w-5/6 items-center">
						<h1 className="text-xl font-bold">Moje Wyjazdy</h1>
						{/* <Link to="/AddNewTrip"> */}
						<Button color="secondary">+ Nowy Wyjazd</Button>
						{/* </Link> */}
					</div>
					<div className="flex flex-wrap flex-row justify-center gap-x-5 gap-y-5 w-5/6">
						<TripCard />
						<TripCard />
						<TripCard />
						<TripCard />
						<TripCard />
						<TripCard />
					</div>
				</div>
			</div>
			<Footer />
		</div>
		// 	<Routes>
		// 		<Route path="/AddNewTrip" element={<AddNewTrip />} />
		// 	</Routes>
		// </Router>
	)
}

export default App
