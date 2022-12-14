import { Block } from "../../utils/Block";
import { changePasswordTemplate } from "./changePasswordTemplate";
import { GeneralButton } from "../../components/generalButton/GeneralButton";
import { GeneralInput } from "../../components/generalInput/GeneralInput";
import { GoBackAside } from "../../components/goBackAside/GoBackAside";
import { Input } from "../../components/input/Input";
import { router } from "../../index";
import {
  ValidationPattern,
  ValidationError,
} from "../../utils/models/validation";
import { CommonProps } from "../../utils/models/props";
import { onSubmitForm } from "../../utils/form/form";
import "./changePassword.scss";
import { UserController } from '../../controllers/User';
import { ROUTES } from '../../utils/router/routes';

type ChangePasswordType = {
  avatarURL: string;
  generalInputOldPassword: GeneralInput;
  generalInputNewPassword: GeneralInput;
  generalButtonSave: GeneralButton;
  goBackAside: GoBackAside;
} & CommonProps;

const userCOntroller = new UserController();

export class ChangePassword extends Block<ChangePasswordType> {
  constructor() {
    super("div", {
      avatarURL:
        "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
      generalInputOldPassword: new GeneralInput({
        input: new Input({
          attr: {
            type: "password",
            name: "oldPassword",
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "Old password",
        errorText: ValidationError.Password,
      }),
      generalInputNewPassword: new GeneralInput({
        input: new Input({
          attr: {
            type: "password",
            name: "newPassword",
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "New password",
        errorText: ValidationError.Password,
      }),

      generalButtonSave: new GeneralButton({
        buttonText: "Save",
      }),
      goBackAside: new GoBackAside({
        events: {
          click: () => router.back(),
        },
      }),
      events: {
        submit: (event) => {
          const value = onSubmitForm.apply<
            ChangePassword,
            [Event, string],
            { oldPassword: string, newPassword: string; }
          >(this, [
            event,
            ".change-password-form",
          ]);
          userCOntroller.changePassword(value).then(() => router.go(ROUTES.Profile));
        }
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(changePasswordTemplate, this.props);
  }
}
