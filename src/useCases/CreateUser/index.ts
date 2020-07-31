import MailTrapProvider from "../../providers/implementations/MailTrapProvider";
import PostgresUsersRepository from "../../repositories/implementations/PostgresUsersRepository";
import CreateUserUseCase from "./CreateUserUseCase";
import CreateUserController from "./CreateUserController";

const postgresUsersRepository = new PostgresUsersRepository();
const mailTrapProvider = new MailTrapProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailTrapProvider,
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };