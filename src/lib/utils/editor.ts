import { unicodeMaps } from "./unicodeMaps";

import type { MappableCommand, ListCommand } from "../types/editor";

const insertUnorderedList = (text: string) => {
  const lines = text.split("\n");
  const formattedLines = lines.map((line) => {
    return  line.trim() ? `• ${line}` : line;
  });

  return formattedLines.join("\n");
};

const insertOrderedList = (text: string) => {
  const lines = text.split("\n");
  let listNumber = 0;
  const formattedLines = lines.map((line, index) => {
    listNumber = line.trim() ? listNumber + 1 : listNumber;
    return line.trim() ? `${listNumber}. ${line}` : line;
  });

  return formattedLines.join("\n");
};

const isMappableCommand = (command: string): command is MappableCommand => {
  return command === "bold" || command === "italic";
};

const isListCommand = (command: string): command is ListCommand => {
  return command === "insertunorderedlist" || command === "insertorderedlist";
};

export const executeFormatCommand = (command: string, text: string) => {
  if (isMappableCommand(command)) {
    const commandMap = unicodeMaps[command];
    const formattedChars = text.split("").map((char) => {
      return commandMap[char] || char;
    });

    return formattedChars.join("");
  }

  if (isListCommand(command)) {
    if (command === "insertunorderedlist") {
      return insertUnorderedList(text);
    }
    return insertOrderedList(text);
  }

  console.error(`Command ${command} is not supported`);
};
