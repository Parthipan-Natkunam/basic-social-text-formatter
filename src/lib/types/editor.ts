export type EditorCommand =
  | "bold"
  | "italic"
  | "insertUnorderedList"
  | "insertOrderedList";

  export type Tool = {
    icon: string;
    command: EditorCommand;
    tooltip: string;
  }