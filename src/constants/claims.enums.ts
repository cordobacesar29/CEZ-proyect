export enum City {
  ZARATE = "Zárate",
  LIMA = "Lima",
}

export enum StatusType {
  REGISTERED = "Registrado",
  IN_PROGRESS = "En progreso",
  LOCKED = "Bloqueado",
  FINALIZED = "Finalizado",
}

export interface IClaimFront {
  id: string;
  client_number: string;
  client_name: string;
  client_city: City;
  client_direction: string;
  client_phone: string;
  client_email: string;
  description: string;
  created_at: string;
  updated_at: string | null;
  blocking_reason: string | null;
  status: StatusType;
  staff_id: string | null;
}
