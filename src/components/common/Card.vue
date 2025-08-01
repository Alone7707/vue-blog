<template>
    <div class="sidebar-widget">
        <h3 class="widget-title">{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.sidebar-widget {
    background-color: var(--sidebar-background);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 25px;
    margin-bottom: 30px;
}

.widget-title {
    font-size: 1.2em;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    color: var(--dark-color);
}
</style>