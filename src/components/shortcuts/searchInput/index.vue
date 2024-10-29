<script setup lang="ts">
import { HTMLAttributes, computed, onMounted, ref } from 'vue'

const searchInputRef = ref<HTMLElement | null>()

const { searchStyle, modelValue } = defineProps<{
    modelValue: string
    searchStyle: {
        searchTextColor: string
        searchTextFontSize: string
        searchPlaceholder: string
        searchPlaceholderColor: string
    }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'up-arrow-pressed'): void
    (e: 'down-arrow-pressed'): void
    (e: 'enter-pressed'): void
}>()

const {
    searchTextColor,
    searchTextFontSize,
    searchPlaceholder,
    searchPlaceholderColor,
} = searchStyle

const inputStyle = computed<HTMLAttributes['style']>(() => ({
    color: searchTextColor,
    fontSize: searchTextFontSize,
    '--qs-placeholder-color': searchPlaceholderColor,
}))

const prefixStyle = computed<HTMLAttributes['style']>(() => ({
    background: searchTextColor,
}))

const focusInputField = async () => {
    searchInputRef.value?.focus()
}

onMounted(() => {
    focusInputField()
})

function inputChange(e: Event) {
    const newValue = (e.target as HTMLInputElement)?.value ?? ''
    emit('update:modelValue', newValue)
}

const tabPressed = (e: Event) => {
    e.preventDefault()
    downArrowPressed(e)
}

const upArrowPressed = (e: Event) => {
    e.preventDefault()
    emit('up-arrow-pressed')
}

const downArrowPressed = (e: Event) => {
    e.preventDefault()
    emit('down-arrow-pressed')
}

const enterPressed = (e: Event) => {
    e.preventDefault()
    emit('enter-pressed')
}

// End of script
</script>

<template>
    <div class="qs-dialog-searchbar">
        <div :style="prefixStyle" class="qs-dialog-searchbar-prefix"></div>
        <input
            :value="modelValue"
            ref="searchInputRef"
            @input="inputChange"
            :style="inputStyle"
            :placeholder="searchPlaceholder"
            type="text"
            class="qs-dialog-searchbar-input"
            @keydown.tab.capture="tabPressed"
            @keydown.up.capture="upArrowPressed"
            @keydown.down.capture="downArrowPressed"
            @keydown.enter.capture="enterPressed"
        />
    </div>
</template>

<style>
.qs-dialog-searchbar {
    display: flex;
    position: relative;
    flex-shrink: 0;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
}
.qs-dialog-searchbar:focus-within .qs-dialog-searchbar-prefix {
    visibility: visible;
}
.qs-dialog-searchbar-prefix {
    visibility: hidden;
    position: absolute;
    left: -0.75rem;
    width: 0.25rem;
    height: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
}
.qs-dialog-searchbar-input {
    outline: none;
    border: none;
    padding: 1rem 0.75rem;
    flex: 1;
    background: transparent;
}
.qs-dialog-searchbar-input::placeholder {
    color: var(--qs-placeholder-color);
}
</style>
