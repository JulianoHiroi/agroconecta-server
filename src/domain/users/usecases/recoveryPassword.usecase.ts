import { EmailService } from "../../../infra/providers/email/email.service";
import { EmailError } from "../../../infra/providers/email/error/email.error";
import TokenService from "../../../infra/providers/token/token.service";
import UserRepository from "../../../infra/repositories/user.repository";
import UserError from "../errors/user.errors";

class RecoveryPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService
  ) {}
  async execute(email: string) {
    const user = await this.userRepository.findUser({
      email: email,
    });
    if (!user) {
      throw new UserError("notFound");
    }
    if (!this.emailService.verifyConnection()) {
      throw new EmailError("connectionError");
    }
   // Gerar código de recuperação que tenha 6 digitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const codeCreate = await this.userRepository.createRecoveryCode({
      email: email,
      code: code,
      expiration: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
    });
    if (!codeCreate) {
      throw new UserError("errorCreateCode");
    }
    this.emailService.sendEmail({
      to: user.email,
      subject: "Recuperação de senha - UserSystem",
      html: ` <h2>Recuperação de senha</h2>
      <p>
        Você está recebendo este email porque utilizou a opção para recuperar a sua senha do UserSystem. Se você não solicitou uma alteração de senha, ignore este email.
        <br />
        <br />
        O Código de recuperação é ${code} válido por 24 horas.
        <br />
      </p>`,
    });
  }
}

export default RecoveryPasswordUseCase;
