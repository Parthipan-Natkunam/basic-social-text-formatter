import type { ComponentType } from "svelte";

export type EditorCommand =
  | "bold"
  | "italic"
  | "insertUnorderedList"
  | "insertOrderedList";

export type MappableCommand = "bold" | "italic";
export type ListCommand = "insertunorderedlist" | "insertorderedlist";

export type ActionCommand = "copycontent" | "analyzesentiment";

export type Tool = {
  icon: ComponentType;
  command: EditorCommand;
  tooltip: string;
};
