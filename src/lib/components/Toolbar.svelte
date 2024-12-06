<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { EditorCommand, Tool } from "../types/editor";
  import ToolbarButton from "./ToolbarButton.svelte";
  import SentimentBadge from "./SentimentBadge.svelte";

  import BoldIcon from "./icons/BoldIcon.svelte";
  import ItalicIcon from "./icons/ItalicIcon.svelte";
  import ListIcon from "./icons/ListIcon.svelte";
  import OrderedListIcon from "./icons/OrderedListIcon.svelte";

  export let detectedSentiment = "";

  const dispatch = createEventDispatcher<{ command: EditorCommand }>();

  const tools: Tool[] = [
    { command: "bold", icon: BoldIcon, tooltip: "Bold" },
    { command: "italic", icon: ItalicIcon, tooltip: "Italic" },
    {
      command: "insertUnorderedList",
      icon: ListIcon,
      tooltip: "Bullet List",
    },
    {
      command: "insertOrderedList",
      icon: OrderedListIcon,
      tooltip: "Numbered List",
    },
  ];

  function executeCommand(command: EditorCommand) {
    dispatch("command", command);
  }
</script>

<div class="toolbar">
  {#each tools as tool}
    <ToolbarButton {tool} on:click={() => executeCommand(tool.command)} />
  {/each}
  <SentimentBadge bind:sentiment={detectedSentiment} />
</div>

<style>
  .toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
</style>
