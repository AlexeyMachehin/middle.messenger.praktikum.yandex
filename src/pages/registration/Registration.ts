import { Block } from "../../utils/Block";
import { registrationTemplate } from "./registrationTemplate";
import { GeneralButton } from "../../components/generalButton/GeneralButton";
import { GeneralInput } from "../../components/generalInput/GeneralInput";
import { GeneralLink } from "../../components/generalLink/GeneralLink";
import { Input } from "../../components/input/Input";
import { onSubmitForm } from "../../utils/form/form";
import { UserController } from "../../controllers/User";
import { ROUTES } from "../../utils/router/routes";
import { router } from "../../index";
import { CommonProps } from "../../utils/models/props";
import { ValidationPattern } from "../../utils/models/validation";
import { ValidationError } from "../../utils/models/validation";
import "./registration.scss";
import { UserDto } from '../../utils/dto/user';

type RegistrationType = {
  generalInputEmail: GeneralInput;
  generalInputLogin: GeneralInput;
  generalInputName: GeneralInput;
  generalInputSurname: GeneralInput;
  generalInputPhoneNumber: GeneralInput;
  generalInputPassword: GeneralInput;
  generalButtonCreateAccount: GeneralButton;
  generalLinkEnter: GeneralLink;
} & CommonProps;

const userController = new UserController();

export class Registration extends Block<RegistrationType> {
  constructor() {
    super("div", {
      generalInputEmail: new GeneralInput({
        input: new Input({
          attr: {
            type: "email",
            name: "email",
            required: true,
            pattern: ValidationPattern.Email,
          },
        }),
        label: "email",
        errorText: ValidationError.Email,
      }),
      generalInputLogin: new GeneralInput({
        input: new Input({
          attr: {
            type: "login",
            name: "login",
            maxLength: 20,
            minLength: 3,
            required: true,
            pattern: ValidationPattern.Login,
          },
        }),
        label: "login",
        errorText: ValidationError.Login,
      }),
      generalInputName: new GeneralInput({
        input: new Input({
          attr: {
            type: "text",
            name: "first_name",
            required: true,
            pattern: ValidationPattern.FirstName,
          },
        }),
        label: "name",
        errorText: ValidationError.FirstName,
      }),
      generalInputSurname: new GeneralInput({
        input: new Input({
          attr: {
            type: "text",
            name: "second_name",
            required: true,
            pattern: ValidationPattern.SecondName,
          },
        }),
        label: "surname",
        errorText: ValidationError.SecondName,
      }),
      generalInputPhoneNumber: new GeneralInput({
        input: new Input({
          attr: {
            type: "tel",
            name: "phone",
            maxLength: 15,
            minLength: 10,
            required: true,
            pattern: ValidationPattern.Phone,
          },
        }),
        label: "phone number",
        errorText: ValidationError.Phone,
      }),
      generalInputPassword: new GeneralInput({
        input: new Input({
          attr: {
            type: "password",
            name: "password",
            maxLength: 40,
            minLength: 8,
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "password",
        errorText: ValidationError.Password,
      }),
      generalButtonCreateAccount: new GeneralButton({
        buttonText: "Create account",
      }),
      generalLinkEnter: new GeneralLink({
        text: "Login",
        href: ROUTES.Login,
      }),
      events: {
        submit: (event) => {
          const inputValues = onSubmitForm.apply<
            Registration,
            [Event, string],
            UserDto
          >(this, [event, ".registration-form"]);
          userController.signUp(inputValues).then(() => {
            router.go(ROUTES.Chats);
          });
        },
      },
      class: ["card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(registrationTemplate, this.props);
  }
}
