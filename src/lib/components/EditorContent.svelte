<script lang="ts">
  export let selectedContent = "";

  let textareaElement: HTMLTextAreaElement;
  function handleSelect() {
    const selectedText = textareaElement.value.substring(
      textareaElement.selectionStart,
      textareaElement.selectionEnd
    );
    selectedContent = selectedText;
  }

  export function replaceSelectedText(newText: string) {
    const start = textareaElement.selectionStart;
    const end = textareaElement.selectionEnd;
    textareaElement.setRangeText(newText, start, end, 'end');
    selectedContent = newText;
  }
</script>

<textarea
  class="editor-content"
  bind:this={textareaElement}
  on:select={handleSelect}
  placeholder="Type Your Content Here..."
/>

<style>
  .editor-content {
    height: 200px;
    padding: 1rem;
    width: calc(100% - 2px - 2rem);
    background: white;
    color: black;
    border: none;
    outline: none;
    overflow-y: auto;
    resize: none;
    scrollbar-color: black transparent;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  .editor-content::-webkit-scrollbar {
    background-color: transparent;
    width: 8px;
  }

  .editor-content::-webkit-scrollbar-thumb {
    background-color: black;
  }
</style>
