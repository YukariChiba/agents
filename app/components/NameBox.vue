<template>
    <div
        v-if="agent.dead"
        class="dead-name-box border border-md border-current"
        :class="props.class"
    >
        {{ agent.name }}
    </div>
    <div v-else :class="props.class">
        {{ agent.name }}
    </div>
</template>

<script setup lang="ts">
import type { Agent } from '~/types/agent'

const props = defineProps<{
    agent: Pick<Agent, 'name' | 'dead'>;
    class?: string;
}>();
</script>

<style scoped>
.dead-name-box {
    display: inline-block;
    padding: 1px 4px;
}
</style>
