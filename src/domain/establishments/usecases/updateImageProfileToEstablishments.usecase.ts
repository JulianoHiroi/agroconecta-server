import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import EstablishmentError from "../error/establishments.error";
import UpdateEstablishmentUseCase from "./updateEstablishments.usecase";

type UpdateEstablishmentUseCaseRequest = {
    id: string;
    imageProfileUrl: string;
};

type UpdateEstablishmentUseCaseResponse = {
    id: string;
    imageProfileUrl: string;
};
    


class UpdateImageProfileToEstablishmentsUseCase {
  constructor(private establishmentRepository: EstablishmentRepository ) {}

  async execute(
    establishmentId: string,
    imageProfileUrl: string
  ): Promise<UpdateEstablishmentUseCaseResponse> {
    if (!establishmentId || !imageProfileUrl) {
      throw new Error("Invalid data");
    }

    const establishmentExists = await this.establishmentRepository.findById(establishmentId);
    if (!establishmentExists) {
      throw new EstablishmentError("notFound");
    }
    const updatedEstablishment = await this.establishmentRepository.updateImageProfile(
      establishmentId,
      imageProfileUrl
    );

    if (!updatedEstablishment) {
      throw new EstablishmentError("notFound");
    }
    return {
      id: updatedEstablishment.id,
      imageProfileUrl: updatedEstablishment.imageProfileUrl || "",
    };
  }
}

export default UpdateImageProfileToEstablishmentsUseCase;