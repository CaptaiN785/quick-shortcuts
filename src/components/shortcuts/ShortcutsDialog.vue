<script setup lang="ts">
import { computed, HTMLAttributes, ref, useTemplateRef, watch } from 'vue'
import SearchInput from './searchInput/index.vue'
import Title from './Title.vue'
import { defaultStyle } from './constants'
import { SearchAlgoType, TitleStyle } from '../../types/props'
import { Option } from '../../types/options'
import Options from './options/index.vue'
import { StyleProp } from '../../types/styles'

const searchQuery = ref<string>('')
const qsOptionRef = useTemplateRef<typeof Options | null>('qsOptionRef')

const { options, searchAlgoType, customStyles, visible, dialogTitle } =
    defineProps<{
        options: Option[]
        searchAlgoType: SearchAlgoType
        customStyles: StyleProp
        visible: boolean
        dialogTitle: string
    }>()

const isVisible = defineModel('visible', {
    required: true,
})
const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'select', value: Option): void
}>()

// Styles
const dialogStyles = computed<HTMLAttributes['style']>(() => ({
    backgroundColor: customStyles.dialogColor,
    boxShadow: `0 0 12px 4px ${customStyles.dialogShadowColor ?? defaultStyle.dialogShadowColor}`,
    borderRadius:
        customStyles.dialogBorderRadius ?? defaultStyle.dialogBorderRadius,
    zIndex: customStyles.dialogZIndex ?? defaultStyle.dialogZIndex,
    height: customStyles.dialogHeight ?? defaultStyle.dialogHeight,
    width: customStyles.dialogWidth ?? defaultStyle.dialogWidth,
}))

const titleStyle = computed<TitleStyle>(() => ({
    fontSize: customStyles.titleFontSize ?? defaultStyle.titleFontSize,
    color: customStyles.titleColor ?? defaultStyle.titleColor,
}))

const searchStyle = computed(() => ({
    searchTextColor:
        customStyles.searchTextColor ?? defaultStyle.searchTextColor,
    searchTextFontSize:
        customStyles.searchTextFontSize ?? defaultStyle.searchTextFontSize,
    searchPlaceholder:
        customStyles.searchPlaceholder ?? defaultStyle.searchPlaceholder,
    searchPlaceholderColor:
        customStyles.searchPlaceholderColor ??
        defaultStyle.searchPlaceholderColor,
}))

const optionsStyle = computed(() => ({
    optionTextColor:
        customStyles.optionTextColor ?? defaultStyle.optionTextColor,
    optionDescriptionColor:
        customStyles.optionDescriptionColor ??
        defaultStyle.optionDescriptionColor,
    optionHoverColor:
        customStyles.optionHoverColor ?? defaultStyle.optionHoverColor,
}))

// Event functions
function upArrowPressed() {
    qsOptionRef.value?.upArrowPressed()
}

function downArrowPressed() {
    qsOptionRef.value?.downArrowPressed()
}

function enterPressed() {
    qsOptionRef.value?.enterPressed()
}

function performSelectedAction(option: Option | undefined) {
    if (!option) return
    const { onSelect } = option
    onSelect?.() // Execute if available
    emit('update:visible', false)
    emit('select', option)
}

watch(isVisible, () => {
    searchQuery.value = ''
})

// End of script
</script>

<template>
    <Teleport to="body">
        <div v-if="visible" :style="dialogStyles" class="qs-shortcuts-dialog">
            <Title :title="dialogTitle" :titleStyle="titleStyle" />
            <SearchInput
                v-model="searchQuery"
                :searchStyle="searchStyle"
                @up-arrow-pressed="upArrowPressed"
                @down-arrow-pressed="downArrowPressed"
                @enter-pressed="enterPressed"
            />
            <Options
                ref="qsOptionRef"
                :searchQuery="searchQuery"
                :options="options"
                :optionsStyle="optionsStyle"
                :searchAlgoType="searchAlgoType"
                @select="performSelectedAction"
            />
        </div>
    </Teleport>
</template>

<style scoped>
.qs-shortcuts-dialog {
    position: fixed;
    padding: 0.75rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    display: flex;
    flex-direction: column;
}
</style>
