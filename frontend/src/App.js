import Footer from "./components/Footer.js"
import Navbar from "./components/Navbar.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home.js"
import AddNewTrip from "./views/AddNewTrip.js"
import Trip from "./views/Trip.js"

function App() {
	return (
		<Router>
			<div className="bg-background ">
				<Navbar />
				<div className="flex flex-col justify-center items-center">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/AddNewTrip" element={<AddNewTrip />} />
						<Route path="/Trip" element={<Trip />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
