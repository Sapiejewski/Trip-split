import Footer from "./components/Footer.js"
import Navbar from "./components/Navbar.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home.js"

function App() {
	return (
		<Router>
		<div className="bg-background">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<Footer />
		</div>
		</Router>
	)
}

export default App
