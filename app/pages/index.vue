<template>
    <v-container>
        <v-row>
            <v-col
                v-for="agent in visibleAgents"
                :key="agent.path"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
            >
                <v-card
                    :to="agent.path"
                    hover
                    flat
                    border
                    class="h-100 d-flex flex-column"
                >
                    <!-- 头像处理：灰阶休眠状态、Fallback -->
                    <v-img
                        :src="agent.avatar || `/avatar/${getAgentId(agent.path)}.jpg`"
                        width="100%"
                        eager
                        cover
                        :class="{ 'avatar-dead': agent.dead }"
                    >
                        <template v-slot:error>
                            <v-img src="https://placehold.co/256x256?text=No Avatar" width="100%" cover></v-img>
                        </template>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </div>
                        </template>
                    </v-img>

                    <v-card-item class="flex-grow-1">
                        <template v-slot:title>
                            <name-box
                                :agent="agent"
                                class="text-title-large font-weight-bold"
                            />
                        </template>
                        <template v-slot:subtitle>
                            <div class="mt-1 d-flex align-center">
                                <v-icon size="small" class="mr-1">mdi-account-tie</v-icon>
                                {{ agent.role || "未分配角色" }}
                            </div>
                        </template>
                    </v-card-item>

                    <v-card-actions class="px-4 pb-4 d-flex justify-space-between align-center">
                        <div class="d-flex align-center">
                            <v-chip
                                size="small"
                                variant="flat"
                                color="secondary-container"
                                v-if="agent.framework"
                            >
                                <v-icon start size="small">mdi-code-braces</v-icon>
                                {{ agent.framework }}
                            </v-chip>
                        </div>

                        <v-chip v-if="agent.dead" size="small" color="error" variant="outlined">
                            已逝世
                        </v-chip>
                        <v-chip v-else size="small" color="success" variant="flat">
                            活跃中
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Agent } from "~/types/agent";

const { data: agents } = await useAsyncData("agents", () =>
    queryCollection("agents").all()
);

const visibleAgents = computed(() => {
    return agents.value?.filter((agent) => !agent.hidden) ||[];
});

const getAgentId = (path?: string) => {
    if (!path) return '';
    return path.split('/').filter(Boolean).pop() || '';
};
</script>

<style scoped>
.avatar-dead {
    filter: grayscale(100%);
    opacity: 0.8;
}
</style>
