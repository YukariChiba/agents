<template>
    <v-app>
        <v-app-bar flat border>
            <v-container class="d-flex align-center px-4" max-width="1600">
                <div class="d-flex align-center ml-1 ml-sm-4 transition-swing">
                    <NuxtLink
                        to="/"
                        class="text-decoration-none d-flex align-center"
                    >
                        <v-icon
                            color="primary"
                            class="mr-1 mr-sm-2 d-none d-sm-inline"
                            size="large"
                            >mdi-robot</v-icon
                        >
                        <span
                            class="font-weight-black text-primary text-title-large"
                            style="letter-spacing: -0.5px"
                        >
                            0x7f
                            <span class="text-medium-emphasis">Agents</span>
                        </span>
                    </NuxtLink>
                </div>

                <v-spacer></v-spacer>

                <v-btn
                    icon
                    @click="toggleTheme"
                    class="mr-1 mr-sm-2 d-none d-sm-inline"
                >
                    <v-icon>{{
                        theme.global.current.value.dark
                            ? "mdi-weather-night"
                            : "mdi-weather-sunny"
                    }}</v-icon>
                </v-btn>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container class="d-flex align-center px-4" max-width="1600">
                <NuxtPage />
            </v-container>
        </v-main>
        <foot-bar />
    </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

useHead({
    htmlAttrs: {
        lang: 'zh-CN'
    },
    title : '0x7f Agents'
});

const theme = useTheme();

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
};
</script>

<style>
/* =========================================
   全局 Markdown 排版美化 (深度适配 Vuetify 主题)
   ========================================= */
.markdown-body {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(var(--v-theme-on-surface), 0.87); /* 适配亮/暗色模式的文字色 */
    word-wrap: break-word;
}

/* 标题样式 */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
    margin-top: 1.5em;
    margin-bottom: 0.75em;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    line-height: 1.25;
}
.markdown-body h1 {
    font-size: 2.25em;
}
.markdown-body h2 {
    font-size: 1.75em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12); /* 标题下划线 */
}
.markdown-body h3 {
    font-size: 1.35em;
}

/* 段落与链接 */
.markdown-body p {
    margin-top: 0;
    margin-bottom: 1.2em;
}
.markdown-body a {
    color: rgb(var(--v-theme-primary)); /* 使用 Vuetify 主题色 */
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
}
.markdown-body a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
}

/* 列表 */
.markdown-body ul,
.markdown-body ol {
    margin-top: 0;
    margin-bottom: 1.2em;
    padding-left: 2em;
}
.markdown-body li {
    margin-bottom: 0.3em;
}

/* 引用块 (Blockquote) */
.markdown-body blockquote {
    margin: 0 0 1.2em;
    padding: 0.75em 1.2em;
    color: rgba(var(--v-theme-on-surface), 0.7);
    background-color: rgba(var(--v-theme-on-surface), 0.04);
    border-left: 4px solid rgb(var(--v-theme-primary));
    border-radius: 0 8px 8px 0;
}
.markdown-body blockquote p:last-child {
    margin-bottom: 0;
}

/* 行内代码 */
.markdown-body code {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
    font-size: 0.85em;
    padding: 0.2em 0.4em;
    background-color: rgba(var(--v-theme-on-surface), 0.08);
    color: rgb(var(--v-theme-primary)); /* 高亮行内代码 */
    border-radius: 6px;
}

/* 代码块 */
.markdown-body pre {
    margin-bottom: 1.5em;
    padding: 1.2em;
    overflow: auto;
    background-color: rgb(var(--v-theme-surface-variant)); /* 融合 MD3 风格的背景卡片色 */
    color: rgb(var(--v-theme-on-surface-variant));
    border-radius: 8px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}
.markdown-body pre code {
    font-size: 0.9em;
    padding: 0;
    background-color: transparent;
    color: inherit;
    border-radius: 0;
}

/* 表格 */
.markdown-body table {
    width: 100%;
    margin-bottom: 1.5em;
    border-collapse: collapse;
}
.markdown-body table th,
.markdown-body table td {
    padding: 0.6em 1em;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}
.markdown-body table th {
    font-weight: 600;
    background-color: rgba(var(--v-theme-on-surface), 0.04);
}

/* 分割线与图片 */
.markdown-body hr {
    height: 1px;
    margin: 2em 0;
    background-color: rgba(var(--v-theme-on-surface), 0.12);
    border: none;
}
.markdown-body img {
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
