import { Flex, Text, Heading, Button } from "@chakra-ui/react";
import { Colors } from "../../utils/Colors";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";

export const Home = () => {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      m={"2rem"}
      direction={"column"}
      gap={"2rem"}
    >
      <Heading color={Colors.text_primary}>Reclamos CEZ</Heading>
      <Text>
        Bienvenidos al sitio de reclamos de la cooperativa eléctrica de Zárate.
      </Text>
      <Link to={ROUTES.CLAIM_FORM}>
        <Button color={Colors.text_primary}>Iniciar Reclamo</Button>
      </Link>
    </Flex>
  );
};
