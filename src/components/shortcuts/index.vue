<script setup lang="ts">
import { onMounted, onScopeDispose, onUnmounted, onUpdated, ref } from 'vue'
import ShortcutsDialog from './ShortcutsDialog.vue'
import { SearchAlgoType } from '../../types/props'
import { StyleProp } from '../../types/styles'
import { defaultStyle } from './constants'
import { Option } from '../../types/options'

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

function addKeyboardListener() {
    window.addEventListener('keydown', keyboardListeners)
}

function removeKeyboardListener() {
    window.removeEventListener('keydown', keyboardListeners)
}

onMounted(() => {
    addKeyboardListener()
})

onUnmounted(() => {
    removeKeyboardListener()
})
onScopeDispose(() => {
    removeKeyboardListener()
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
