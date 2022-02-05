import { validate } from "@valider/core";

const required = (msg: string) => validate((value) => !!value, msg);

export default required;
