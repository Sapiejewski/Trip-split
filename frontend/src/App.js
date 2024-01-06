import Footer from "./components/Footer.js"
import Navbar from "./components/Navbar.js"
import TripCard from "./components/TripCard.js"
function App() {
	return (
		<div>
			<Navbar />
			<div className="flex flex-wrap justify-around px-96">
				<TripCard />
				<TripCard />
				<TripCard />
				<TripCard />
				<TripCard />
				<TripCard />
			</div>
			<Footer />
		</div>
	)
}

export default App
