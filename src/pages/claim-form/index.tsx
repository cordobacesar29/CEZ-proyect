import { Button, Flex, Text } from "@chakra-ui/react";
import { Colors } from "../../utils/Colors";
import { City } from "../../constants/city";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { claimSchema } from "../../constants/claim.schema";
import { InputText } from "../../components/commons/input-text";
import { InputSelect } from "../../components/commons/input-select";
import { InputTextarea } from "../../components/commons/input-textarea";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

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
  const [claimId, setClaimId] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isLoading },
    reset,
  } = useForm<FormValue>({
    resolver: yupResolver(claimSchema),
  });

  const onSubmit = (event: FormValue) => {
    const claimsRef = collection(db, "Claims");
    addDoc(claimsRef, {
      ...event,
      status: "",
      blocking_reason: null,
      staff_id: null,
    }).then((doc) => setClaimId(doc.id));
    reset();
  };

  if (claimId) {
    return (
      <Flex
        w={"100%"}
        alignItems={"center"}
        p={{ base: "1rem", md: "2rem" }}
        direction={"column"}
        gap={"2rem"}
      >
        <Flex
          p={"1rem"}
          borderRadius={12}
          bgColor={"#dbf5e6"}
          boxShadow={"7px 10px 53px -15px rgba(0,0,0,0.38)"}
        >
          <Text
            fontWeight={600}
            fontSize={{ base: "18px", md: "24px" }}
            color={Colors.text_primary}
          >
            ¡Tu reclamo se generó correctamente!
          </Text>
        </Flex>
        <Text
          fontWeight={500}
          fontSize={{ base: "14px", md: "16px" }}
        >{`El código de tu reclamo es : ${claimId}. Te mantendremos informado sobre el estado de tu reclamo vía email.`}</Text>
        <Link to={ROUTES.HOME} style={{width:'fit-content'}}>
          <Button w={{base:'100%', md:'fit-content'}}>Inicio</Button>
        </Link>
      </Flex>
    );
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
            <InputTextarea fullWidth control={control} name="description" />
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
