<script lang="ts">
  import type { Tool} from '../types/editor';

  export let tool: Tool;
</script>

<button
  class="toolbar-button"
  title={tool.tooltip}
  on:click
>
  <svelte:component this={tool.icon} />
</button>

<style>
  .toolbar-button {
    padding: 0.25rem 0.75rem;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
  }

  .toolbar-button:hover {
    background: #f8fafc;
  }
</style>