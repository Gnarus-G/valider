import { validate } from "@valider/core";

export const required = (msg: string) => validate((value) => !!value, msg);

export const minLength = (min: number, msg: string) =>
  validate((value: string) => value.length >= min, msg);

export const isBeforeNow = (msg: string) =>
  validate((value: Date) => value.getTime() < Date.now(), msg);

export const isAfterNow = (msg: string) =>
  validate((value: Date) => value.getTime() > Date.now(), msg);
