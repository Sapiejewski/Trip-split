import { Avatar, AvatarGroup, Card, Tooltip } from "@nextui-org/react"

import image from "./../images/tripImages/img.jpg"
import { useEffect, useState } from "react"
import ExpansesTable from "../components/ExpansesTable"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	useDisclosure,
} from "@nextui-org/react"

const Trip = ({ trip_id }) => {
	const [user, setUser] = useState({ name: "", email: "" })
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [users, setUsers] = useState([
		"Filip",
		"Arek",
		"Kuba",
		"Kacper",
		"Jarek",
	])
	const handleUserChange = (e, key) => {
		setUser(prevState => ({
			...prevState,
			[key]: e.target.value,
			trip: trip_id,
		}))
	}

	const handleUserClick = () => {
		fetch("http://localhost:8000/trip_user/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
	}
	useEffect(() => {
		console.log(trip_id)
	}, [])

	//   useEffect(() => {
	//     fetch("http://localhost:8000/user", {
	//       headers: {
	//         "Access-Control-Allow-Origin": "*",
	//       },
	//     })
	//       .then((res) => res.json())
	//       .then((data) => {
	//         console.log(data);
	//         setUsers(data);
	//       });
	//   }, []);

	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Dodaj nowego członka wycieczki
							</ModalHeader>
							<ModalBody>
								<h1 className="font-bold text-lg">Imię</h1>
								<Input
									value={user.name}
									onChange={e => handleUserChange(e, "name")}
									size="lg"
									type="text"
									variant="bordered"
									classNames={{ input: "bg-transparent" }}
								/>
								<h1 className="font-bold text-lg">Email</h1>
								<Input
									value={user.email}
									onChange={e => handleUserChange(e, "email")}
									size="lg"
									type="email"
									variant="bordered"
									classNames={{ input: "bg-transparent" }}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Zamknij
								</Button>
								<Button color="primary" onPress={handleUserClick}>
									Dodaj
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<div className="w-full">
				<img src={image} className="w-full h-60 object-cover" />
				<div className="px-4">
					<div className="flex justify-between flex-col md:flex-row p-4">
						<div className="md:w-[50%] justify-center flex">
							<Card className="p-6 md:min-w-[400px] sm:w-[80%] w-full relative bottom-10">
								<div className="flex flex-col items-start justify-center">
									<h1 className="text-2xl md:text-4xl font-bold mb-5">
										Wakacje w Grecji
									</h1>
									<p className="text-sm pl-4 mb-3">2021.01.23 - 2021.01.30</p>
									<p className="bg-primary px-5 py-1 rounded-md shadow-sm self-end">
										Koszt:&nbsp;
										<p className="font-semibold inline">300 PLN</p>
									</p>
								</div>
							</Card>
						</div>
						<div className="md:w-[50%]  ">
							<AvatarGroup max={8}>
								{users.map(user => (
									<Tooltip content={user} placement="bottom">
										<button>
											<Avatar name={user} />
										</button>
									</Tooltip>
								))}
								<Tooltip content={"adduser"} placement="bottom">
									<Button onClick={onOpen} color="primary">
										Dodaj uczestnika wycieczki
									</Button>
								</Tooltip>
							</AvatarGroup>
						</div>
					</div>
					<ExpansesTable />
				</div>
			</div>
		</>
	)
}

export default Trip
