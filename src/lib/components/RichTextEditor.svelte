<svelte:options customElement="rich-text-editor" />

<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import type { EditorCommand } from "../types/editor";
  import { createEventDispatcher } from "svelte";
  //import { executeEditorCommand } from '../utils/editor';

  let editorContent = "";


  function handleCommand(event: CustomEvent<EditorCommand>) {
    const command = event.detail;
    console.log("Received command:", command);
    // executeEditorCommand(command);
  }
</script>

<div class="editor-container">
  <Toolbar on:command={handleCommand} />
  <EditorContent bind:content={editorContent} />
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
