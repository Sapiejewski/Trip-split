import {
	Avatar,
	AvatarGroup,
	AvatarIcon,
	Card,
	Tooltip,
} from "@nextui-org/react"
import { CiCirclePlus } from "react-icons/ci"
import image from "./../images/img.jpg"
import { useEffect, useState } from "react"
import ExpansesTable from "../components/ExpansesTable"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react"

const Trip = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [users, setUsers] = useState([
		"Filip",
		"Arek",
		"Kuba",
		"Kacper",
		"Jarek",
	])

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
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Zamknij
								</Button>
								<Button color="primary" onPress={onClose}>
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
						<div className="md:w-[50%] ">
							<AvatarGroup max={8}>
								{users.map(user => (
									<Tooltip content={user} placement="bottom">
										<button>
											<Avatar name={user} />
										</button>
									</Tooltip>
								))}
								<Tooltip content={"adduser"} placement="bottom">
									<button onClick={onOpen}>
										<Avatar name={"adduser"} icon={<CiCirclePlus />} />
									</button>
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
