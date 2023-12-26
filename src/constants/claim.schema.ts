import * as yup from "yup";
import { City } from "./city";

export const claimSchema = yup
  .object({
    client_number: yup
      .string()
      .min(6, "El número de cliente no es válido")
      .max(8, "El número de cliente no es válido")
      .required("Campo requerido").typeError('Campo requerido '),
    client_name: yup.string().required("Campo requerido"),
    client_city: yup
      .string()
      .oneOf([City.ZARATE, City.LIMA], "Campo requerido")
      .required("Campo requerido"),
    client_direction: yup.string().required("Campo requerido"),
    client_phone: yup
      .string()
      .max(14, "El teléfono no es válido")
      .min(10, "El teléfono no es válido")
      .test("El teléfono no es válido", "El teléfono no es válido", (value) => {
        return !value?.includes("_");
      })
      .required("Campo requerido"),
    client_email: yup
      .string()
      .email("El email no es válido.")
      .required("Campo requerido"),
    description: yup.string().required("Campo requerido"),
  })
  .required();
