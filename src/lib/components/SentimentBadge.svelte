<script>
  export let sentiment = "neutral";
</script>

{#if sentiment}
  <span class="badge {sentiment}">
    <span>
      <svg
        class="sparkle-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M8 15C12.8747 15 15 12.949 15 8C15 12.949 17.1104 15 22 15C17.1104 15 15 17.1104 15 22C15 17.1104 12.8747 15 8 15Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        >
        </path>
        <path
          d="M2 6.5C5.13376 6.5 6.5 5.18153 6.5 2C6.5 5.18153 7.85669 6.5 11 6.5C7.85669 6.5 6.5 7.85669 6.5 11C6.5 7.85669 5.13376 6.5 2 6.5Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linejoin="round"
        >
        </path>
      </svg>
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
  .sparkle-icon {
    height: 1rem;
    margin-right: 0.25rem;
    fill: currentColor;
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
