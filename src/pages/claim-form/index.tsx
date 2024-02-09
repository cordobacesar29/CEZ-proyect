import { useEffect, useState } from "react";
import { Button, Flex, Text, useBoolean } from "@chakra-ui/react";
import { Colors } from "../../utils/Colors";
import { City, IClaimFront, StatusType } from "../../constants/claims.enums";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { claimSchema } from "../../constants/claim.schema";
import { InputText } from "../../components/commons/input-text";
import { InputSelect } from "../../components/commons/input-select";
import { InputTextarea } from "../../components/commons/input-textarea";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import dayjs from "dayjs";
import { SuccessfulMessage } from "../../components/feature/SuccessfulMessage";
import { useSnackbar } from "../../hook/useSnackbar";

interface FormValue {
  client_number: string;
  client_name: string;
  client_city: City;
  client_direction: string;
  client_phone: string;
  client_email: string;
  description: string;
}

export const ClaimForm = () => {
  const [claims, setClaims] = useState<IClaimFront[]>([]);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useBoolean();
  const { snackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    reset,
  } = useForm<FormValue>({
    resolver: yupResolver(claimSchema),
  });

  const claimsRef = collection(db, "Claims");

  const getData = async () => {
    const getDocsFromDB = await getDocs(claimsRef);
    try {
      setClaims(
        //@ts-ignore
        getDocsFromDB.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleError = (client_number: string) => {
    setError("client_number", {
      type: "validate",
      message: "El número de cliente ya tiene un reclamo registrado.",
    });
    snackbar({
      type: "error",
      message: `El cliente n° ${client_number} ya tiene un reclamo registrado.`,
    });
    setIsLoading.off();
  };
  const onSubmit = async (event: FormValue) => {
    setIsLoading.on();
    const claimAlreadyExist = claims.find(
      (el) => el.client_number === event.client_number
    );

    if (claimAlreadyExist) return handleError(claimAlreadyExist.client_number);

    try {
      const response = await addDoc(claimsRef, {
        ...event,
        status: StatusType.REGISTERED,
        blocking_reason: null,
        staff_id: null,
        created_at: dayjs(new Date()).format(),
        updated_at: null,
      });
      if (response) {
        setClaimId(response.id);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading.on();
  };

  if (claimId) {
    return <SuccessfulMessage claimId={claimId} />;
  }

  return (
    <Flex
      w={"100%"}
      justify={"center"}
      p={{ base: "1rem", md: "2rem" }}
      bgColor={Colors.green_background}
    >
      <Flex
        as={"form"}
        border={`1px solid ${Colors.text_primary}`}
        p={{ base: "1rem", md: "2rem" }}
        borderRadius={12}
        direction={"column"}
        gap={"2rem"}
        onSubmit={handleSubmit(onSubmit)}
        bgColor={Colors.white_background}
      >
        <Text
          textAlign={"center"}
          fontSize={"24px"}
          fontWeight={600}
          color={Colors.text_primary}
        >
          Completá los siguientes datos
        </Text>
        <Flex direction={"column"} gap={"1rem"}>
          <InputText
            type="number"
            required
            name="client_number"
            control={control}
            fullWidth
            label="Número de cliente"
            placeholder="Ingresá tu número de cliente"
          />
          <InputText
            required
            type="text"
            name="client_name"
            control={control}
            fullWidth
            label="Nombre de cliente"
            placeholder="Ingresá tu nombre"
          />
          <InputText
            required
            type="number"
            name="client_phone"
            control={control}
            fullWidth
            label="Teléfono de contacto"
            placeholder="Ingresá tu número de teléfono"
          />
          <InputText
            required
            type="email"
            name="client_email"
            control={control}
            fullWidth
            label="Email"
            placeholder="Ingresá tu email"
          />
          <InputText
            required
            type="text"
            name="client_direction"
            control={control}
            fullWidth
            label="Dirección"
            placeholder="Ingresá donde vivís"
          />
          <Flex direction={"column"} gap={"8px"} w={"100%"}>
            <Text>Localidad</Text>
            <InputSelect
              control={control}
              name="client_city"
              options={[
                { label: City.ZARATE, value: City.ZARATE },
                { label: City.LIMA, value: City.LIMA },
              ]}
              fullWidth
              required
              placeholder="Seleccioná tu localidad"
            />
          </Flex>
          <Flex direction={"column"} gap={"8px"} w={"100%"}>
            <Text>Descripcion del reclamo</Text>
            <InputTextarea
              fullWidth
              control={control}
              name="description"
              placeholder="Ingresa tu reclamo"
            />
          </Flex>
          <Flex justify={"space-evenly"}>
            <Link to={ROUTES.HOME}>
              <Button
                isLoading={isLoading}
                disabled={isSubmitting}
                colorScheme="red"
              >
                Cancelar
              </Button>
            </Link>
            <Button
              isLoading={isLoading}
              disabled={isSubmitting}
              type="submit"
              colorScheme="green"
            >
              Enviar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
