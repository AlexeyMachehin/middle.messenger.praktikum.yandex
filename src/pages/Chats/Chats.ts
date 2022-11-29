import { ChatsController } from "../../controllers/Chats";
import Block from "../../utils/Block";
import { chatsTemplate } from "./chatsTemplate";
import { CommonProps } from "../../utils/models/props";
import {Avatar} from "../../components/Avatar/Avatar";
import {GeneralLink} from "../../components/GeneralLink/GeneralLink";
import {Chat} from "../../components/Chat/Chat";
import {ChatPageInput} from "../../components/ChatPageInput/ChatPageInput";
import {Message} from "../../components/Message/Message";
import {MessagesList} from "../../components/MessagesList/MessagesList";
import {IconButton} from "../../components/IconButton/IconButton";
import {Select} from "../../components/Select/Select";
import {SelectItem} from "../../components/SelectItem/SelectItem";
import {ManageUserModal} from "../../components/ManageUserModal/ManageUserModal";
import {GeneralInput} from "../../components/GeneralInput/GeneralInput";
import {GeneralButton} from "../../components/GeneralButton/GeneralButton";
import {ManageChatModal} from "../../components/ManageChatModal/ManageChatModal";
import {Input} from "../../components/Input/Input";
import { router } from "../../index";
import { storeCurrentUser } from "../../store/StoreCurrentUser";
import { ROUTES } from "../../utils/router/routes";
import { storeChat, StoreChatEvents } from "../../store/StoreChat";
import { MessageDto } from "../../utils/dto/message";
import { WebSocketService } from "../../utils/webSocket";
import { ChatDto } from "../../utils/dto/chat";
import { chats as mockChats } from "../../utils/mockData";
import { onSubmitForm } from "../../utils/form/form";
import "./chats.scss";

type ChatsType = {
  createChatButton: GeneralButton;
  chatPageInput: ChatPageInput;
  chats: Chat[];
  generalLink: GeneralLink;
  avatarHeader: Avatar;
  userName: string;
  messagesList: MessagesList;
  inputFooter: ChatPageInput;
  messageButton: IconButton;
  manageFileButton: IconButton;
  selectFooter: Select;
  manageUserButton: IconButton;
  selectHeader: Select;
  deleteUserDialog: ManageUserModal;
  addUserDialog: ManageUserModal;
  manageChatModal: ManageChatModal;
  createChatInput: ChatPageInput;
  getSelectedChat: () => number | null;
} & CommonProps;

const chatsController = new ChatsController();
const webSocket = new WebSocketService();
const DEFAULT_AVATAR_URL =
  "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1";

export class Chats extends Block<ChatsType> {
  constructor() {
    super("div", {
      createChatInput: new ChatPageInput({
        name: "title",
        type: "text",
        placeholder: "Enter name of new chat",
      }),
      createChatButton: new GeneralButton({
        buttonText: "Create new chat",
        events: {
          click: (event) => {
            const values = onSubmitForm.apply<
              Chats,
              [Event, string],
              { title: string }
            >(this, [event, ".create-chat-form"]);
            chatsController.createChat(values);
          },
        },
      }),
      chatPageInput: new ChatPageInput({
        class: ["input-wrapper"],
        placeholder: "Search chat",
        type: "search",
        events: {
          change: (event) =>
            chatsController.findChat((event.target as HTMLInputElement).value),
        },
      }),
      class: ["chats-container"],
      chats: [],
      generalLink: new GeneralLink({
        text: "Profile",
        class: ["profile-link-container"],
        events: {
          click: () => router.go(ROUTES.Profile),
        },
      }),
      avatarHeader: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
      userName: mockChats[0].display_name,
      messagesList: new MessagesList({
        timeHeader: mockChats[0].time,
        messages: [],
      }),
      inputFooter: new ChatPageInput({
        class: ["input-wrapper"],
        type: "text",
        placeholder: "message",
        name: "message",
      }),
      messageButton: new IconButton({
        class: ["message-form__button"],
        events: {
          click: (event) => {
            const values = onSubmitForm.apply<
              Chats,
              [Event, string],
              { message: string }
            >(this, [event, ".message-form"]);
            const chatId = storeChat.getSelectedChatId();
            if (chatId) {
              webSocket.sendMessage(chatId, values.message);
            }
          },
        },
      }),
      manageFileButton: new IconButton({
        class: ["manage-file__button"],
        events: {
          click: (event) =>
            openSelect.apply<Chats, [Event, string], void>(this, [
              event,
              "selectFooter",
            ]),
        },
      }),
      selectFooter: new Select({
        class: ["select-list-footer"],
        items: [
          new SelectItem({
            text: "Photo or video",
            classIcon: "photo-video-icon",
          }),
          new SelectItem({
            text: "File",
            classIcon: "file-icon",
          }),
          new SelectItem({
            text: "Location",
            classIcon: "location-icon",
          }),
        ],
      }),
      manageUserButton: new IconButton({
        class: ["manage-user__button"],
        events: {
          click: (event) =>
            openSelect.apply<Chats, [Event, string], void>(this, [
              event,
              "selectHeader",
            ]),
        },
      }),
      selectHeader: new Select({
        class: ["select-list-header"],
        items: [
          new SelectItem({
            text: "Add user",
            classIcon: "add-icon",
            events: {
              click: () =>
                openDialog.apply<Chats, [string], void>(this, [
                  "addUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete user",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<Chats, [string], void>(this, [
                  "deleteUserDialog",
                ]),
            },
          }),
          new SelectItem({
            text: "Delete chat",
            classIcon: "delete-icon",
            events: {
              click: () =>
                openDialog.apply<Chats, [string], void>(this, [
                  "manageChatModal",
                ]),
            },
          }),
        ],
      }),
      deleteUserDialog: new ManageUserModal({
        class: ["deleteUserModal"],
        title: "Delete user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              required: true,
            },
          }),
          errorText: "",
        }),
        generalButton: new GeneralButton({
          buttonText: "Delete user",
        }),
      }),
      addUserDialog: new ManageUserModal({
        class: ["addUserModal"],
        title: "Add user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              maxLength: 20,
              minLength: 3,
              required: true,
            },
          }),
          errorText: "Invalid login",
        }),
        generalButton: new GeneralButton({
          buttonText: "Add user",
        }),
      }),
      manageChatModal: new ManageChatModal({
        class: ["deleteChatModal"],
        title: "Are you sure you want to delete the chat?",
        generalButton: new GeneralButton({
          buttonText: "Delete",
        }),
      }),
      getSelectedChat: () => {
        const param = router.getParams();
        if (param != null && param.chatId) {
          return param.chatId;
        }
        return false;
      },
    });

    this.subscribeToChangeChats();
    this.subscribeToChangeMessages();

    this.initValue();
  }

  subscribeToChangeChats(): void {
    storeChat.on(StoreChatEvents.Updated, (state) => {
      const chats = state.map((chat: ChatDto) => {
        const chatInstance = new Chat({
          class: ["user"],
          name: chat.title,
          message: chat.last_message?.content ?? "",
          time: chat.last_message?.time ?? "",
          count: chat.unread_count,
          avatar: new Avatar({
            avatarURL: chat.avatar ?? DEFAULT_AVATAR_URL,
            class: ["avatar-container"],
            classImg: "avatar-container_avatar",
          }),
          id: chat.id,
          events: {
            click: () => {
              const chatId = chat.id;
              const messages = storeChat.getMessages(chatId);
              storeChat.setSelectedChat(chat);
              router.go(ROUTES.ChatById(chatId), { chatId });
              if (messages) {
                this.createMessageComponent(messages);
              } else {
                const currentUser = storeCurrentUser.getState().currentUser;
                if (currentUser) {
                  webSocket.connect({
                    chatId,
                    userId: currentUser.id,
                  });
                }
              }
            },
          },
        });
        return chatInstance;
      });
      this.setProps({ chats });
    });
  }

  subscribeToChangeMessages(): void {
    storeChat.on(StoreChatEvents.UpdatedMessages, (state) =>
      this.createMessageComponent(state)
    );
  }

  private _isMyMessage(id: number) {
    const storeId = storeCurrentUser.getCurrentUser()?.id;
    if (id === storeId) {
      return "my-message";
    } else {
      return "user-message";
    }
  }

  private initValue(): void {
    chatsController.getChats();
    const chatId = router.getParams()?.chatId;
    if (chatId) {
      storeChat.setSelectedChatId(chatId);
      this.connectWebSocket(chatId);
      this.createMessageComponent(storeChat.getMessages(chatId) ?? []);
    }
  }

  private createMessageComponent(state: MessageDto[]): void {
    const messages = state
      .sort(
        (a: any, b: any) =>
          new Date(a.time).valueOf() - new Date(b.time).valueOf()
      )
      .map((message: MessageDto) => {
        return new Message({
          message: message.content,
          time: new Date(message.time).toLocaleTimeString(),
          name: message.user_id,
          className: this._isMyMessage(message.user_id),
          avatar: new Avatar({
            avatarURL: mockChats[0].avatarURL,
            class: ["avatar-container"],
            classImg: "avatar-container_avatar",
          }),
        });
      });
    if (!Array.isArray(this.children.messagesList)) {
      this.children.messagesList.setProps({ messages });
    }
  }

  connectWebSocket(chatId: number): void {
    if (chatId != null) {
      const user = storeCurrentUser.getCurrentUser();
      if (user) {
        webSocket.connect({
          chatId,
          userId: user.id,
        });
      }
    }
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

function openSelect(this: Chats) {
  const indexOfEvent = 0;
  const indexOfSelect = 1;
  (this.children[arguments[indexOfSelect]] as Select).service?.open();
  (arguments[indexOfEvent] as PointerEvent).stopPropagation();
}

function openDialog(this: Chats) {
  const indexOfEvent = 0;
  (
    this.children[arguments[indexOfEvent]] as ManageUserModal
  ).service?.openDialog();
}
