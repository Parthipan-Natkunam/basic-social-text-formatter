<script>
  import CheckIcon from "./icons/CheckIcon.svelte";
  import CrossIcon from "./icons/CrossIcon.svelte";
  import InfoIcon from "./icons/InfoIcon.svelte";

  export let message = "";
  export let type = "success";
  let visible = false;

  const showToast = () => {
    visible = true;
    setTimeout(() => {
      visible = false;
      message = "";
    }, 5000);
  };

  $: if (message) {
    showToast();
  }
</script>

<div class="toast-container">
  {#if visible}
    <div class="toast {type}">
      <span class="icon">
        {#if type === "success"}
          <CheckIcon />
        {:else if type === "error"}
          <CrossIcon />
        {:else}
          <InfoIcon />
        {/if}
      </span>
      <span class="message">{message}</span>
    </div>
  {/if}
</div>

<style>
  .toast-container {
    position: absolute;
    top: -4rem;
    left: 0;
    right: 0;
  }
  .toast {
    width: calc(100% - 32px);
    padding: 16px;
    color: white;
    border-radius: 4px;
    opacity: 0.9;
    z-index: 1000;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .toast > .message {
    text-align: center;
  }

  .success {
    background-color: #48bb78;
  }

  .error {
    background-color: #f56565;
  }

  .info {
    background-color: #4299e1;
  }
</style>
