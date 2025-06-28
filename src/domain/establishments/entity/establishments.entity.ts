import { randomUUID } from "crypto";
import User from "../../users/entity/user.entity";


/*

model Establishments {
  id                   String                 @id @default(uuid())
  name                 String
  logradouro           String
  number               String
  CEP                  String
  phone                String
  description          String?
  idUser               String
  user                 User                   @relation(fields: [idUser], references: [id])
  EstablishmentsImages EstablishmentsImages[]
}
  model EstablishmentsImages {
  id              String         @id @default(uuid())
  urlImage        String
  establishmentId String
  establishment   Establishments @relation(fields: [establishmentId], references: [id])
}


faça a classe EstablishmentsEntity que representa a tabela Establishments no banco de dados
*/

class Establishments {
  id: string;
  name: string;
  logradouro: string;
  latitue: number;
  longitude: number;
  number: string;
  CEP: string;
  phone: string;
  description?: string;
  userId: string;
  user?: User;

  constructor(props: Omit<Establishments, "id">, id?: string) {
    this.id = id ? id : randomUUID();
    this.name = props.name;
    this.logradouro = props.logradouro;
    this.latitue = props.latitue;
    this.longitude = props.longitude;
    this.number = props.number;
    this.CEP = props.CEP;
    this.phone = props.phone;
    this.description = props.description;
    this.user = props.user;
    this.userId = props.userId;
  }
}


export default Establishments;  