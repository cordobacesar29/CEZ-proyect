import { Flex, Text, Button } from "@chakra-ui/react"
import { Colors } from "../../utils/Colors"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants/ROUTES"

interface Props {
  claimId: string
}
export const SuccessfulMessage = ({claimId}:Props) => {
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
  )
}