import User from '../../entities/User'
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { IMailProvider } from '../../providers/IMailProvider';

class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {

  }

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe Zetech',
        email: 'zetech@gmail.com',
      },
      subject: 'Bem-vindo ao Zetech',
      body: 'Você foi cadastrado na Zetech.'
    });
  };
}

export default CreateUserUseCase;