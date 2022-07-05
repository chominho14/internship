import { atom } from "recoil";

export const messageState = atom({
  key: "message",
  default: [],
});

export const toggleMediaState = atom({
  key: "toggleMediaBtn",
  default: false,
});
