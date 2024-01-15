import TripCard from "./components/TripCard";
import { Button } from "@nextui-org/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img from "./images/tripImages/img.jpg";

const url = process.env.REACT_APP_API_URL;

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/trip/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    setLoading(false);
  }, []);

  return (
    <div className="flex items-center justify-center mt-10 w-full">
      <div className="flex flex-col items-center justify-between w-11/12  gap-y-5">
        <div className="flex flex-row justify-between w-5/6 items-center">
          <h1 className="text-xl font-bold">Moje Wyjazdy</h1>
          <Link to="/AddNewTrip">
            <Button color="secondary">+ Nowy Wyjazd</Button>
          </Link>
        </div>
        <div className="flex flex-wrap flex-row justify-start gap-x-5 gap-y-5 w-5/6">
          {data.map((item) => (
            <TripCard
              imageId={item.id}
              tripId={item.id}
              name={item.name}
              date_start={item.date_start}
              date_end={item.date_end}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
