import { unicodeMaps } from "./unicodeMaps";

import type { MappableCommands } from "../types/editor";

const isMappableCommand = (command: string): command is MappableCommands => {
  return command === "bold" || command === "italic";
};

export const executeFormatCommand = (command: string, text: string) => {
  if (isMappableCommand(command)) {
    const commandMap = unicodeMaps[command];
    const formattedChars = text.split("").map((char) => {
      return commandMap[char] || char;
    });

    return formattedChars.join("");
  }

  console.error(`Command ${command} is not supported`);
};
