<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ShortcutsDialog from './ShortcutsDialog.vue'
import { SearchAlgoType } from './types/props'
import { StyleProp } from './types'
import { defaultStyle } from './constants'
import { Option } from './types/options'

const isEnabled = ref<boolean>(false)

const {
    searchAlgoType = 'normal',
    customStyles = defaultStyle,
    activationKey = 'k',
    options,
} = defineProps<{
    searchAlgoType?: SearchAlgoType
    customStyles?: StyleProp
    activationKey?: string
    options: Option[]
}>()

function keyboardListeners(e: KeyboardEvent) {
    const { ctrlKey, key } = e
    if (ctrlKey && key.toLowerCase() === activationKey.toLowerCase()) {
        isEnabled.value = true
    }
    if (key === 'Escape') {
        isEnabled.value = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', keyboardListeners)
})

onUnmounted(() => {
    window.removeEventListener('keydown', keyboardListeners)
})

const emit = defineEmits<{
    (e: 'select', value: Option): void
}>()

function selectOption(option: Option) {
    emit('select', option)
}

// End of script
</script>

<template>
    <ShortcutsDialog
        v-model:visible="isEnabled"
        :options="options"
        :searchAlgoType="searchAlgoType"
        :customStyles="customStyles"
        @select="selectOption"
    />
</template>
