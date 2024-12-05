<svelte:options customElement="rich-text-editor" />

<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import type { EditorCommand } from "../types/editor";
  import { executeFormatCommand } from "../utils/editor";

  let contentToFormat = "";
  let editorContentRef: EditorContent;

  function handleCommand(event: CustomEvent<EditorCommand>) {
    const command = event.detail.toLocaleLowerCase();
    console.log("Received command:", command);
    const formattedContent = executeFormatCommand(command, contentToFormat);
    if (formattedContent) {
      editorContentRef.replaceSelectedText(formattedContent);
    }
  }
</script>

<div class="editor-container">
  <Toolbar on:command={handleCommand} />
  <EditorContent
    bind:selectedContent={contentToFormat}
    bind:this={editorContentRef}
  />
</div>

<style>
  .editor-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
</style>
