<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import SparkleIcon from "./icons/SparkleIcon.svelte";
  import type { ActionCommand } from "../types/editor";

  export let AIActionInProgress: boolean;
  export let disableAIFeatures: boolean;

  const dispatch = createEventDispatcher<{ command: ActionCommand }>();

  export function copyContent() {
    dispatch("command", "copycontent");
  }

  export function analyzeSentiment() {
    dispatch("command", "analyzesentiment");
  }
</script>

<div class="button-container">
  <button
    class="ai-sentiment-btn"
    disabled={AIActionInProgress || disableAIFeatures}
    on:click={analyzeSentiment}
    title={AIActionInProgress || disableAIFeatures
      ? "Sentiment Analysis is not available on your Browser"
      : null}
  >
    <span>
      <SparkleIcon />
      {AIActionInProgress ? "Detecting Sentiment" : "Detect Sentiment"}</span
    >
  </button>
  <button class="editor-copy-btn" on:click={copyContent}
    >Copy to Clipboard</button
  >
</div>

<style>
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

  .ai-sentiment-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>
