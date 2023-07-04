import React from "react";
import { renderToString } from "react-dom/server";
import Main from "./entry";

export default function render() {
  const html = renderToString(<Main />);

  return html;
}
