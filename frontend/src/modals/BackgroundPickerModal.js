import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../images/tripImages", false, /\.(png|jpe?g|svg)$/)
);

const BackgroundPickerModal = ({ setImage }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleImageChange = (index) => {
    console.log(index);
    setImage(index);
    onOpenChange();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="relative bottom-14 right-10"
        size="sm"
        variant="flat"
      >
        Zmień zdjęcie
      </Button>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Wybór zdjęcia w tle
              </ModalHeader>
              <ModalBody className="pb-10 flex flex-wrap">
                {images.map((image, index) => (
                  <button key={index} onClick={() => handleImageChange(index)}>
                    <img
                      className="w-[250px] object-cover aspect-video  rounded-md hover:scale-105 hover:cursor-pointer hover:shadow-2xl hover:border-primary hover:border-3 duration-75 transition-all"
                      src={image}
                      alt={`Image ${index}`}
                    />
                  </button>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BackgroundPickerModal;
