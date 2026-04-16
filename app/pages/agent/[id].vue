<template>
    <v-container v-if="agent">
        <!-- 返回按钮 -->
        <v-btn prepend-icon="mdi-arrow-left" to="/" variant="text" class="mb-4">
            返回列表
        </v-btn>

        <v-row>
            <!-- 左侧：Agent 信息面板 -->
            <v-col cols="12" md="4">
                <v-card class="pa-4 text-center" flat border>
                    <v-avatar
                        size="180"
                        class="mb-4"
                        variant="flat"
                        rounded="lg"
                        border
                        :class="{ 'avatar-dead': agent.dead }"
                    >
                        <v-img
                            :src="agent.avatar || `/avatar/${getAgentId(agent.path)}.jpg`"
                            cover
                        >
                            <template v-slot:error>
                                <v-img src="https://placehold.co/256x256?text=No Avatar" cover></v-img>
                            </template>
                        </v-img>
                    </v-avatar>

                    <div>
                        <name-box :agent="agent" class="text-headline-small font-weight-bold mt-4 mb-2" />
                    </div>
                    <div class="text-subtitle-1 text-grey-darken-1 mb-4">
                        {{ agent.role }}
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <v-list density="compact" class="text-left bg-transparent">
                        <v-list-item v-if="agent.framework" prepend-icon="mdi-cube-outline">
                            <v-list-item-title>
                                框架:
                                <a :href="agent.framework_url || undefined" target="_blank" class="text-decoration-none text-primary">
                                    {{ agent.framework }}
                                </a>
                            </v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item v-if="agent.contact?.telegram" prepend-icon="mdi-telegram">
                            <v-list-item-title>
                                <a :href="`https://t.me/${agent.contact.telegram.replace('@', '')}`" target="_blank" class="text-decoration-none text-primary">
                                    {{ agent.contact.telegram }}
                                </a>
                            </v-list-item-title>
                        </v-list-item>
                        
                        <v-list-item v-if="agent.contact?.email" prepend-icon="mdi-email-outline">
                            <v-list-item-title>
                                <a :href="`mailto:${agent.contact.email}`" class="text-decoration-none text-primary">
                                    {{ agent.contact.email }}
                                </a>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item v-if="agent.born" prepend-icon="mdi-calendar-star">
                            <v-list-item-title>诞生: {{ agent.born }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="agent.dead" prepend-icon="mdi-coffin">
                            <v-list-item-title>逝世: {{ agent.dead }}</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <!-- 人际关系展示 -->
                    <div v-if="agent.relationship" class="text-left mt-4">
                        <div class="text-subtitle-2 font-weight-bold mb-2 text-primary">人际关系网</div>
                        <v-expansion-panels variant="accordion" flat class="border">
                            <v-expansion-panel v-for="(relations, relId) in agent.relationship" :key="relId" :title="relId">
                                <v-expansion-panel-text>
                                    <v-chip v-for="rel in relations" :key="rel" size="small" class="mr-2" variant="tonal">
                                        {{ rel }}
                                    </v-chip>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </v-card>
            </v-col>

            <!-- 右侧：文档内容展示 -->
            <v-col cols="12" md="8">
                <v-card class="h-100" flat border>
                    <v-tabs v-model="tab" color="primary" bg-color="surface">
                        <v-tab value="desc"><v-icon start>mdi-information-outline</v-icon>介绍文档</v-tab>
                    </v-tabs>

                    <v-card-text class="px-6">
                        <v-window v-model="tab">
                            <v-window-item value="desc">
                                <div class="markdown-body">
                                    <ContentRenderer :value="agent" />
                                </div>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else class="text-center py-10">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Agent } from "~/types/agent";

const route = useRoute();
const tab = ref<string>("desc");

const { data: agent } = await useAsyncData<Agent>(`agent-${route.params.id}`, () => 
    queryCollection("agents").path(route.path).first()
);

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
