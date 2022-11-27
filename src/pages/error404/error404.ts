import Block from "../../utils/block";
import { error404Template } from "./error404Template";
import GeneralLink from "../../components/generalLink/generalLink";
import { router } from "../../index";
import { Props } from "../../utils/models/props";
import { ROUTES } from "../../utils/router/routes";
import "./error404.scss";

type Error404Type = {
  generalLink: GeneralLink;
} & Props;

export default class Error404 extends Block<Error404Type> {
  constructor() {
    super("div", {
      generalLink: new GeneralLink({
        text: "Back to the chat list",
        events: {
          click: () => router.go(ROUTES.Default),
        },
      }),
      class: ["card", "error404__card"],
    });
  }

  render(): DocumentFragment {
    return this.compile(error404Template, this.props);
  }
}
