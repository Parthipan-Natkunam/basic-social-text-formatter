import type { ComponentType } from "svelte";

export type EditorCommand =
  | "bold"
  | "italic"
  | "insertUnorderedList"
  | "insertOrderedList";

export type MappableCommands = "bold" | "italic";
export type ListCommands = "insertunorderedlist" | "insertorderedlist";

export type Tool = {
  icon: ComponentType;
  command: EditorCommand;
  tooltip: string;
};
