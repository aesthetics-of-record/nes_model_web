import { atom } from "recoil";

export const aiListState = atom({
  key: "aiListState",
  default: [],
});

export const RandomAiNameListState = atom({
  key: "RandomAiNameListState",
  default: [],
});

export const ChatListState = atom({
  key: "ChatListState",
  default: [[{ role: "ai", message: "반갑습니다. 메세지를 입력 해 주세요." }]],
});

export const trainLoadingState = atom({
  key: "trainLoadingState",
  default: false,
});
