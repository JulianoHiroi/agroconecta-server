import TokenService from "../../../infra/providers/token/token.service";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../errors/user.errors";
class ValidadeCodeUserUseCase {
  constructor(private readonly userRepository: UserRepository,
                private readonly tokenService: TokenService
  ) {}

  async execute(code: string, email:string): Promise<string> {
    if (!code) {
        throw new UserError("invalidToken");
    }
    if (!email) {
        throw new UserError("invalidEmail");
    }

    const user = await this.userRepository.findRecoveryCode(email);
    const userEmail = await this.userRepository.findUser({ email: email });
    
    if (!user || !userEmail) {
      throw new UserError("invalidToken");
    }
    if (user.code == code && user.expiration > new Date()) {
      return this.tokenService.sign(
        { id: userEmail.id },
        { expiresIn: "24h" }
        ); 
    } else {
      throw new UserError("invalidToken");
    }
  }
}

export default ValidadeCodeUserUseCase;