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
      <div class="progress-bar"></div>
    </div>
  {/if}
</div>

<style>
  .toast-container {
    position: absolute;
    bottom: calc(100% + 1rem);
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
    position: relative;
  }
  .toast > .message {
    text-align: center;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: rgba(255, 240, 230, 0.7);
    animation: progress 5s linear forwards;
    width: 100%;
  }

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0;
    }
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
