import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../images/tripImages", false, /\.(png|jpe?g|svg)$/)
);
const TripCard = ({
  tripId = 1,
  name = "Wakacje w Grecji",
  date_start = "2021-01-23",
  date_end = "2021-01-30",
  href = `/Trip`,
  imageId = 0,
}) => {
  return (
    <a href={`${href}/${tripId}`}>
      <Card className="py-4 hover:scale-105 hover:cursor-pointer shadow-lg hover:shadow-2xl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{`${date_start} - ${date_end}`}</p>
          {/* <small className="text-default-500">Wydajna kasa</small> */}
          <h4 className="font-bold text-large">{name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl aspect-video"
            src={images[imageId]}
            width={270}
          />
        </CardBody>
      </Card>
    </a>
  );
};

export default TripCard;
