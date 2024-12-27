import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";

import RichTextEditor from "../src/lib/components/RichTextEditor.svelte";

describe("RichTextEditor", () => {
  test("renders the component", () => {
    const { getByTestId } = render(RichTextEditor);
    expect(getByTestId("editor-container")).toBeInTheDocument();
  });

  test("accepts text input", () => {
    const { getByRole } = render(RichTextEditor);
    const editor = getByRole("textbox");

    fireEvent.input(editor, { target: { value: "Hello, world!" } });

    expect(editor).toHaveValue("Hello, world!");
  });

  test("copies text to clipboard", async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    const { getByRole, getByText } = render(RichTextEditor);
    const editor = getByRole("textbox");
    const copyButton = getByText("Copy to Clipboard");

    fireEvent.input(editor, { target: { value: "Hello, world!" } });

    await fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith("Hello, world!");
    expect(getByText("Text copied Successfully")).toBeInTheDocument();
  });

  test("converts selected text to bold on button click", () => {
    const { getByRole, getByTitle } = render(RichTextEditor);
    const editor = getByRole("textbox") as HTMLTextAreaElement;
    const boldButton = getByTitle("Bold");

    fireEvent.input(editor, { target: { value: "HELLO, world!" } });
    fireEvent.select(editor, {
      target: { selectionStart: 0, selectionEnd: 5 },
    });
    fireEvent.click(boldButton);

    expect(editor).toHaveValue("𝐇𝐄𝐋𝐋𝐎, world!");
  });

  test("converts selected text to italic on button click", () => {
    const { getByRole, getByTitle } = render(RichTextEditor);
    const editor = getByRole("textbox") as HTMLTextAreaElement;
    const italicButton = getByTitle("Italic");

    fireEvent.input(editor, { target: { value: "Hello, world!" } });
    fireEvent.select(editor, {
      target: { selectionStart: 6, selectionEnd: 12 },
    });
    fireEvent.click(italicButton);

    expect(editor).toHaveValue("Hello, 𝑤𝑜𝑟𝑙𝑑!");
  });

  test("Adds a bullet list to each selected new line on button click", () => {
    const { getByRole, getByTitle } = render(RichTextEditor);
    const editor = getByRole("textbox") as HTMLTextAreaElement;
    const bulletListButton = getByTitle("Bullet List");

    fireEvent.input(editor, {
      target: { value: "item 1\nitem2\nsome other stuff" },
    });
    fireEvent.select(editor, {
      target: { selectionStart: 0, selectionEnd: 11 },
    });

    fireEvent.click(bulletListButton);

    expect(editor).toHaveValue("• item 1\n• item2\nsome other stuff");
  });

  test("Adds a numbered list to each selected new line on button click", () => {
    const { getByRole, getByTitle } = render(RichTextEditor);
    const editor = getByRole("textbox") as HTMLTextAreaElement;
    const numberedListButton = getByTitle("Numbered List");

    fireEvent.input(editor, {
      target: { value: "item 1\nitem2\nsome other stuff" },
    });
    fireEvent.select(editor, {
      target: { selectionStart: 0, selectionEnd: 11 },
    });

    fireEvent.click(numberedListButton);

    expect(editor).toHaveValue("1. item 1\n2. item2\nsome other stuff");
  });
});
