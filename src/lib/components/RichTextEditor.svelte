<svelte:options customElement="rich-text-editor" />

<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import ToastNotification from "./ToastNotification.svelte";
  import type { EditorCommand } from "../types/editor";
  import { executeFormatCommand } from "../utils/editor";

  let contentToFormat = "";
  let editorContentRef: EditorContent;

  let toast = {
    message: "",
    type: "success",
  };

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
      toast = {
        message: "Clipboard API not available on your browser",
        type: "error",
      };
      return;
    }
    if (!text) {
      toast = {
        message: "The editor is empty",
        type: "info",
      };
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast = {
          message: "Text copied to clipboard",
          type: "success",
        };
      })
      .catch((err) => {
        toast = {
          message: "Failed to copy text",
          type: "error",
        };
        console.error(err);
      });
  }
</script>

<div class="editor-container">
  <ToastNotification bind:message={toast.message} bind:type={toast.type} />
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
