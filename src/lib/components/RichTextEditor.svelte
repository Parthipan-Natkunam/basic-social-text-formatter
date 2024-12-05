<svelte:options customElement="rich-text-editor" />

<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import type { EditorCommand } from "../types/editor";
  import { executeFormatCommand } from "../utils/editor";

  let contentToFormat = "";
  let editorContentRef: EditorContent;

  function handleCommand(event: CustomEvent<EditorCommand>) {
    if (contentToFormat.trim().length === 0) {
      return;
    }
    const command = event.detail.toLocaleLowerCase();
    const formattedContent = executeFormatCommand(command, contentToFormat);
    if (formattedContent) {
      editorContentRef.replaceSelectedText(formattedContent);
    }
  }

  function copyToClipboard() {
    const text = editorContentRef.content;
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    if (!text) {
      console.error("No text to copy");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
</script>

<div class="editor-container">
  <Toolbar on:command={handleCommand} />
  <EditorContent
    bind:selectedContent={contentToFormat}
    bind:this={editorContentRef}
  />
  <button class="editor-copy-btn" on:click={copyToClipboard}
    >Copy to Clipboard</button
  >
</div>

<style>
  .editor-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }
  .editor-copy-btn {
    background: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-weight: bold;
    position: absolute;
    right: -0.55rem;
    bottom: -4rem;
  }
  .editor-copy-btn:hover {
    background: #45a049;
  }
</style>
