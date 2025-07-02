import e from "express";
import EstablishmentRepository from "../../../infra/repositories/establishment.repository";
import { SearchEstablishmentsByFilterResponseDTO } from "../@types/establishmentsDTO";

type SearchEstablishmentsByFilterRequest = {
    name?: string;
    idTypeProduct?: string;
    searchRadius?: number; // in meters
    lat: number; // latitude of the user's location
    lng: number; // longitude of the user's location
    idUser: string;
}



class SearchEstablishmentsByFilterUseCase {
  constructor(private readonly establishmentRepository: EstablishmentRepository) {}

  async execute(data: SearchEstablishmentsByFilterRequest): Promise<SearchEstablishmentsByFilterResponseDTO[]> { 
        console.log("SearchEstablishmentsByFilterUseCase data:", data);
    if (!data.lat || !data.lng) {
      throw new Error("Invalid location data");
    }
    if (data.searchRadius && data.searchRadius <= 0) {
      throw new Error("Search radius must be greater than zero");
    }
    if (!data.searchRadius){
        data.searchRadius = 100000; // Default search radius of 5 km if not provided
    }

    const establishments = await this.establishmentRepository.searchByFilter({
      name: data.name,
      idTypeProduct: data.idTypeProduct,
      searchRadius: data.searchRadius,
      lat: data.lat,
      lng: data.lng,
      idUser: data.idUser,
    });

    return establishments;
  }
}

export default SearchEstablishmentsByFilterUseCase;