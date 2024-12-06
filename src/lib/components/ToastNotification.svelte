<script>
    export let message = '';
    export let type = 'success';
    let visible = false;

    const showToast = () => {
        visible = true;
        setTimeout(() => {
            visible = false;
            message = '';
        }, 5000); 
    };

    $: if (message) {
        showToast();
    }
</script>

{#if visible}
    <div class="toast {type}">
        {message}
    </div>
{/if}

<style>
    .toast {
        position: absolute;
        top: -4rem;
        width: calc(100% - 32px);
        padding: 16px;
        color: white;
        border-radius: 4px;
        opacity: 0.9;
        z-index: 1000;
        font-weight: 500;
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