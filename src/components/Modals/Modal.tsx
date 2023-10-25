import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  background,
  Button,
  useDisclosure,
  useToast,
  Stack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import StripeForm from "../StripForm/StripeForm";
// import BbcForm from "./Modals/BbcForm";

const PaymentMethods = ({ isModal, setIsModal, nft, stripe, refetch }: any) => {
  console.log(nft, "1 nft record");
  // const elements = useElements();
  const toast = useToast();
  // const stripe = useStripe();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [bankTransfer, setBankTransfer] = useState(false);
  const [bbcTransfer, setBbcTransfer] = useState(false);

  const { onOpen, onClose } = useDisclosure();

  const handlePayment = (type: any) => {
    if (type === "bank") {
      setBankTransfer(true);
    }
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={() => {
        setIsModal(false);
      }}
    >
      <ModalOverlay />
      <ModalContent bg="#f5f5f5">
        <ModalHeader>Payment Methods</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setIsModal(false);
          }}
        />
        <ModalBody>
          <Stack>
            <Stack
              onClick={() => handlePayment("bank")}
              bg="#ffffff"
              h={120}
              cursor={"pointer"}
              borderLeftColor={"#3182ce"}
              borderWidth={5}
              borderTop="none"
              borderRight="none"
              borderBottom="none"
              borderRadius={5}
              boxShadow={"md"}
            >
              <Flex justify="center" align="center" h="100%">
                <Box>
                  <Text fontSize="xl" textAlign="center">
                    BANK TRANSFER
                  </Text>
                </Box>
              </Flex>
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            size={"sm"}
            onClick={() => {
              setIsModal(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>

        {bankTransfer ? (
          <Elements stripe={stripe}>
            <StripeForm
              isModal={isModal}
              setIsModal={setIsModal}
              nft={nft}
              bankTransfer={bankTransfer}
              setBankTransfer={setBankTransfer}
              refetch={refetch}
            />
          </Elements>
        ) : (
          <></>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PaymentMethods;
