<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import * as Card from '$lib/components/ui/card/index.js';
import { Input } from '$lib/components/ui/input/index.js';
import { Label } from '$lib/components/ui/label/index.js';
import * as Select from '$lib/components/ui/select/index.js';

const platforms = [
    {
        value: 'java',
        label: 'Java',
    },
    {
        value: 'bedrock',
        label: 'Bedrock',
    },
];

let platform = $state('');

const selectedPlatform = $derived(
    platforms.find((f) => f.value === platform)?.label ?? 'Select a platform',
);

const submit = () => {
    const nameElem: HTMLInputElement = document.getElementById(
        'name',
    ) as HTMLInputElement;
    document.getElementById('platform')?.classList.remove('failed');
    nameElem.classList.remove('failed');

    if (platform === '')
        return document.getElementById('platform')?.classList.add('failed');

    if (nameElem.value === '') return nameElem.classList.add('failed');

    location.href = `/register/write/${nameElem.value}/${platform}`;
};
</script>

<Card.Root class="w-[350px]">
    <Card.Header>
        <Card.Title>Link accounts</Card.Title>
        <Card.Description>This will link your discord and minecraft account for this server and add you to the whitelist</Card.Description>
    </Card.Header>
    <Card.Content>
<form>
<div class="grid w-full items-center gap-4">
<div class="flex flex-col space-y-1.5">
        <Label for="name">Name</Label>
        <Input id="name" placeholder="Your in game name" />
</div>
<div class="flex flex-col space-y-1.5">
        <Label for="platform">Platform</Label>
        <Select.Root type="single" bind:value={platform}>
        <Select.Trigger id="platform">
        {selectedPlatform}
        </Select.Trigger>
        <Select.Content>
        {#each platforms as { value, label }}
            <Select.Item {value} {label} />
        {/each}
        </Select.Content>
        </Select.Root>
    </div>
    </div>
    </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
<Button variant="outline">Cancel</Button>
    <Button onclick={submit}>Join!</Button>
    </Card.Footer>
</Card.Root>

<style>
    :global(.failed) {
        outline-style: groove;
        outline-color: #c53636d2;
        outline-width: 2px;
    }
</style>