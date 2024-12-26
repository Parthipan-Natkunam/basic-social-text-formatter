<svelte:options customElement="social-post-formatter" />

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import ToastNotification from "./ToastNotification.svelte";
  import type { EditorCommand, ActionCommand } from "../types/editor";
  import { executeFormatCommand } from "../utils/editor";
  import { isGoogleChrome } from "../utils/browser";
  import ActionButtons from "./ActionButtons.svelte";

  import EdgeAI from "../utils/ai";

  let contentToFormat = "";
  let editorContentRef: EditorContent;

  let AIActionInProgress = false;
  let sentimentResponse = "";
  let disableAIFeatures = false;

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
          message: "Text copied Successfully",
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

  function handleSentimentAnalysis() {
    if (AIActionInProgress) {
      return;
    }
    sentimentResponse = "";
    if (!editorContentRef.content) {
      toast = {
        message: "The editor is empty",
        type: "info",
      };
      return;
    }
    AIActionInProgress = true;
    EdgeAI.prompt(editorContentRef.content)
      .then((sentiment) => {
        sentimentResponse = sentiment;
      })
      .catch((error) => {
        toast = {
          message: "Failed to detect sentiment",
          type: "error",
        };
        sentimentResponse = "";
        console.error(error);
      })
      .finally(() => {
        AIActionInProgress = false;
      });
  }

  function handleActionCommand(event: CustomEvent<ActionCommand>) {
    const command = event.detail;
    switch (command) {
      case "copycontent":
        copyToClipboard();
        break;
      case "analyzesentiment":
        handleSentimentAnalysis();
        break;
      default:
        break;
    }
  }

  onMount(async () => {
    if (!isGoogleChrome()) {
      disableAIFeatures = true;
      toast = {
        message: "The AI features are only available on Google Chrome",
        type: "info",
      };
      return;
    }
    try {
      await EdgeAI.init();
    } catch (error) {
      disableAIFeatures = true;
      toast = {
        message: "AI features are not enabled on your browser",
        type: "info",
      };
      console.error(error);
    }
  });

  onDestroy(() => {
    EdgeAI.disposeSession();
  });
</script>

<div class="editor-container">
  <ToastNotification bind:message={toast.message} bind:type={toast.type} />
  <Toolbar
    on:command={handleCommand}
    bind:detectedSentiment={sentimentResponse}
  />
  <EditorContent
    bind:selectedContent={contentToFormat}
    bind:this={editorContentRef}
  />
  <ActionButtons
    bind:AIActionInProgress
    bind:disableAIFeatures
    on:command={handleActionCommand}
  />
</div>

<style>
  .editor-container {
    background: rgba(255, 255, 255, 0.84);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    position: relative;
    min-height: calc(100vh - 20rem);
    min-width: 256px;
    box-shadow: 0px 7px 7px 3px rgba(0, 0, 0, 0.2);
    grid-template-rows: 70px 3fr 70px;
  }
</style>
