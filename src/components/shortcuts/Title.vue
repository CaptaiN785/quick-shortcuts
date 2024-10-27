<script setup lang="ts">
import { computed, defineProps, HTMLAttributes } from 'vue'
import { TitleProps } from './types/props'

const { title, titleStyle } = defineProps<TitleProps>()

const style = computed<HTMLAttributes['style']>(() => ({
    fontSize: titleStyle.fontSize,
    color: titleStyle.color,
}))

// End of script
</script>

<template>
    <div :style="style" class="qs-dialog-title">{{ title }}</div>
</template>

<style>
.qs-dialog-title {
    padding-bottom: 0.4rem;
    flex-shrink: 0;
}
</style>
