<script lang="ts">
import '../app.css';
let { children } = $props();
</script>

<main class="grid h-screen place-items-center">
    {@render children()}
</main>
