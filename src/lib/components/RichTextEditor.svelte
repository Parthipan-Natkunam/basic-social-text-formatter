<svelte:options customElement="social-post-formatter" />

<script lang="ts">
  import { onMount } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import EditorContent from "./EditorContent.svelte";
  import ToastNotification from "./ToastNotification.svelte";
  import SparkleIcon from "./SparkleIcon.svelte";
  import type { EditorCommand } from "../types/editor";
  import { executeFormatCommand } from "../utils/editor";

  import EdgeAI from "../utils/ai";

  let contentToFormat = "";
  let editorContentRef: EditorContent;

  let AIActionInProgress = false;
  let sentimentResponse = "";

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

  function handleSentimentAnalysis() {
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

  onMount(async () => {
    try {
      await EdgeAI.init();
    } catch (error) {
      toast = {
        message: "AI features are not enabled on your browser",
        type: "info",
      };
      console.error(error);
    }
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
  <div class="button-container">
    <button
      class="ai-sentiment-btn"
      disabled={AIActionInProgress}
      on:click={handleSentimentAnalysis}
    >
      <span>
        <SparkleIcon />
        {AIActionInProgress ? "Detecting Sentiment" : "Detect Sentiment"}</span
      >
    </button>
    <button class="editor-copy-btn" on:click={copyToClipboard}
      >Copy to Clipboard</button
    >
  </div>
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

  .button-container {
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: -0.55rem;
    bottom: -4rem;
  }
  .editor-copy-btn,
  .ai-sentiment-btn {
    background: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-weight: bold;
  }
  .editor-copy-btn:hover {
    background: #45a049;
  }

  .ai-sentiment-btn {
    background: #2196f3;
  }
  .ai-sentiment-btn:hover {
    background: #0b7dda;
  }
</style>
