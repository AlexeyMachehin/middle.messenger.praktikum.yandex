import { MessageDto } from "../utils/dto/message";
import { ChatDto } from "../utils/dto/chat";
import { UserDto } from "../utils/dto/user";
import { EventBus } from "../utils/EventBus";
import {merge} from "../utils/merge";

interface State {
  currentUser: UserDto | null;
  isAuth: boolean | null;
  chats: ChatDto[] | null;
  token: string | null;
  chatMessages: Record<number, MessageDto[]> | null;
  selectedChat: ChatDto | null;
  selectedChatId: number | null;
}

export enum StoreEvents {
  Updated = "updated",
}

const initialState = {
  currentUser: null,
  isAuth: false,
  chats: null,
  token: null,
  chatMessages: null,
  selectedChat: null,
  selectedChatId: null,
};

export class Store extends EventBus {
  state: State = initialState;

  getState() {
    return this.state;
  }

  set(pathName: string, newState: any): void {
    const pathArray = pathName.split(".");
    const newValue = pathArray.reduceRight(
      (acc, item) => ({ [item]: acc }),
      newState
    );
    if (pathArray.length > 1) {
      this.state = merge<State>(this.state, newValue);
      return;
    }
    this.state = {
      ...this.state,
      ...newValue,
    };
  }
}

export const store = new Store();

