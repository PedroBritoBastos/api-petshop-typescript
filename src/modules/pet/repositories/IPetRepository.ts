import { Pet } from "../../../../generated/prisma/client";
import { CreatePetDTO } from "../dtos/CreatePetDTO";

export interface IPetRepository {
  create(data: CreatePetDTO): Promise<Pet>;
}
