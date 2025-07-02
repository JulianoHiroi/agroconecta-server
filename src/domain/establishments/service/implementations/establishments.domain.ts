
import geoLocationGeoCodingService from "../../../../infra/providers/geocoding/implementations/geolocation.geocoding.services";
import EstablishmentPrismaRepository from "../../../../infra/repositories/implementations/establishment.prisma.repository";
import UserPrismaRepository from "../../../../infra/repositories/implementations/user.prisma.repository";
import { ConnectImageToEstablishmentsRequestDTO, ConnectImageToEstablishmentsResponseDTO, CreateEstablishmentRequestDTO, CreateEstablishmentResponseDTO, SearchEstablishmentsByFilterRequestDTO, SearchEstablishmentsByFilterResponseDTO, UpdateEstablishmentRequestDTO, UpdateImageProfileToEstablishmentResponseDTO } from "../../@types/establishmentsDTO";
import UpdateImageProfileToEstablishmentsUseCase from "../../usecases/updateImageProfileToEstablishments.usecase";
import CreateEstablishmentUseCase from "../../usecases/createEstablishments.usecase";
import DeleteEstablishmentUseCase from "../../usecases/deleteEstablishment.usecase";
import GetAllEstablishmentsByUserIdUseCase from "../../usecases/getAllEstablishmentsByUserId.usecase";
import UpdateEstablishmentUseCase from "../../usecases/updateEstablishments.usecase";
import EstablishmentService from "../establishments.service";
import SearchEstablishmentsByFilterUseCase from "../../usecases/searchEstablishmentsByFilter.usecase";

class EstablishmentServiceDomain implements EstablishmentService {
  establishmentRepository = new EstablishmentPrismaRepository();
  userRepository = new UserPrismaRepository(); // Assuming user repository is similar to establishment
  geoLocationService = new geoLocationGeoCodingService(); // Using the geolocation service for address to coordinates conversion


  createEstablishmentUseCase = new CreateEstablishmentUseCase(
    this.establishmentRepository,
    this.userRepository,
    this.geoLocationService
  );

  updateEstablishmentUseCase = new UpdateEstablishmentUseCase(
    this.establishmentRepository,
    this.geoLocationService
  );

  getAllEstablishmentsByUserIdUseCase = new GetAllEstablishmentsByUserIdUseCase(
    this.establishmentRepository
  )

  deleteEstablishmentUseCase = new DeleteEstablishmentUseCase(
    this.establishmentRepository
  )

  updateImageProfileUseCase = new UpdateImageProfileToEstablishmentsUseCase(
    this.establishmentRepository
  );
  searchEstablishmentsByFilterUseCase = new SearchEstablishmentsByFilterUseCase(
    this.establishmentRepository
  );

  constructor() {}

  async createEstablishment(
    data: CreateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO> {
    const establishment = await this.createEstablishmentUseCase.execute({
      ...data,
      userId,
    });
    return establishment;
  }

  async connectImageToEstablishment(
    data: ConnectImageToEstablishmentsRequestDTO,
  ): Promise<ConnectImageToEstablishmentsResponseDTO> {
    const establishment = await this.establishmentRepository.connectImageToEstablishment({
      establishmentId: data.establishmentId,
      imageUrl: data.urlImage,
    });
    return establishment;
  }

  async updateEstablishment(
    data: UpdateEstablishmentRequestDTO,
    userId: string
  ): Promise<CreateEstablishmentResponseDTO> {
    // Assuming you have an update use case similar to create
    const establishment = await this.updateEstablishmentUseCase.execute({
      data,
      userId,
    });
    return establishment;
  }

  async findAllByUserId(
    userId: string
  ): Promise<CreateEstablishmentResponseDTO[] | null> {
    const establishments = await this.getAllEstablishmentsByUserIdUseCase.execute({userId});
    return establishments;
  }
  async delete(id: string, userId: string): Promise<void> {
    await this.deleteEstablishmentUseCase.execute(
      id,
      userId,
    );
  }
  async findById(id: string): Promise<CreateEstablishmentResponseDTO | null> {

    const establishment = await this.establishmentRepository.findById(id);
    return establishment;
  }
  async updateImageProfile(
    id: string,
    imageProfileUrl: string
  ): Promise<UpdateImageProfileToEstablishmentResponseDTO | null> {
    const establishment = await this.updateImageProfileUseCase.execute(
      id,
      imageProfileUrl
    );
    return establishment;
  }

  async searchEstablishmentsByFilter(
    filter: SearchEstablishmentsByFilterRequestDTO
  ): Promise<SearchEstablishmentsByFilterResponseDTO[]> {
    const establishments = await this.searchEstablishmentsByFilterUseCase.execute(filter);
    return establishments;
  }
}
export default EstablishmentServiceDomain;
