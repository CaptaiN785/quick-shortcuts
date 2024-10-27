<script setup lang="ts">
import { defineProps } from 'vue'

const { keyCode } = defineProps<{
    keyCode: string
}>()
</script>

<template>
    <div class="qs-key-code">
        {{ keyCode }}
    </div>
</template>

<style>
.qs-key-code {
    border-radius: 0.25rem;
    border: 1px solid #bbbbbb;
    background: transparent;
    background: rgb(25, 19, 59);
    color: white;
    height: 1.5rem;
    width: 1.5rem;
    font-weight: bold;
    text-align: center;
}
</style>
