import { Button, Flex } from "@chakra-ui/react"
import { useAuth } from "../../hook/useSessionProvider"

export const Login = () => {
  const {login} = useAuth()
  const handleClick = async() => {
    login({email: 'ayelenconte@gmail.com', password: 'test123'})
  }
  return (
    <Flex>
      <Button onClick={handleClick}>
        click
      </Button>
    </Flex>
  )
}