import { Block } from "../../utils/Block";
import { selectTemplate } from "./selectTemplate";
import { CommonProps } from "../../utils/models/props";
import { fromStringToClassName } from "../../utils/fromStringToClassName";
import {SelectItem} from "../selectItem/SelectItem";
import {SelectService} from "./SelectService";

type SelectType = {
  items: SelectItem[];
} & CommonProps;

export class Select extends Block<SelectType> {
  service: SelectService | null = null;
  constructor(props: SelectType) {
    super("ul", {
      ...props,
      class: [...(props.class ?? []), "select-list"],
    });
  }

  componentDidMount(): void {
    if (this.props.class != null) {
      this.service = new SelectService(fromStringToClassName(this.props.class));
    }
  }

  render(): DocumentFragment {
    return this.compile(selectTemplate, this.props);
  }
}
