<script lang="ts">
  import type { EditorCommand } from '../types/editor';

  export let tool: {
    command: EditorCommand;
    icon: string;
    tooltip: string;
  };
</script>

<button
  class="toolbar-button"
  title={tool.tooltip}
  on:click
>
  <img src={tool.icon} alt={tool.tooltip}/>
</button>

<style>
  .toolbar-button {
    padding: 0.25rem 0.5rem;
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