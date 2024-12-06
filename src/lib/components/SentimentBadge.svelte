<script>
  import SparkleIcon from "./icons/SparkleIcon.svelte";

  export let sentiment = "neutral";
</script>

{#if sentiment}
  <span class="badge {sentiment}">
    <span>
      <SparkleIcon />
      <span>{sentiment}</span>
    </span>
  </span>
{/if}

<style>
  .badge {
    padding: 0.25em 0.8em;
    border-radius: 12px;
    font-weight: 400;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    user-select: none;
  }
  .positive {
    background-color: rgba(6, 194, 6, 0.715);
    color: rgb(8, 74, 0);
  }
  .negative {
    background-color: rgba(255, 0, 0, 0.814);
    color: rgb(87, 0, 0);
  }
  .neutral {
    background-color: rgba(173, 173, 173, 0.742);
    color: rgb(36, 36, 36);
  }
</style>
