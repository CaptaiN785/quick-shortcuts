<script setup lang="ts">
import { Option } from '../../../types/options'
import { computed, HTMLAttributes, useTemplateRef, watch } from 'vue'

const optionItemRef = useTemplateRef('optionItemRef')

const { option, optionsStyle, isHovered } = defineProps<{
    option: Option & { isChild?: boolean }
    isHovered: boolean
    optionsStyle: {
        optionTextColor: string
        optionDescriptionColor: string
        optionHoverColor: string
    }
}>()

const { optionTextColor, optionDescriptionColor, optionHoverColor } =
    optionsStyle

const listItemStyle = computed<HTMLAttributes['style']>(() => ({
    '--qs-hover-bg-color': optionHoverColor,
}))

const isReallyHovered = computed(() => isHovered)

watch(isReallyHovered, (newValue: boolean) => {
    if (newValue && optionItemRef.value) {
        const parent =
            optionItemRef.value.parentElement?.parentElement?.parentElement
                ?.parentElement
        if (!parent) return
        const { top, bottom } = parent.getBoundingClientRect()
        const { top: elementTop, bottom: elementBottom } =
            optionItemRef.value.getBoundingClientRect()

        if (elementTop < top || elementBottom > bottom) {
            optionItemRef.value.scrollIntoView({
                block: 'nearest',
                behavior: 'auto',
                inline: 'nearest',
            })
        }
    }
})

// End of script
</script>

<template>
    <label
        ref="optionItemRef"
        role="listitem"
        class="qs-options-item"
        :class="{
            'qs-disabled-item': option.isDisabled,
            'qs-options-children': option.isChild,
            'qs-disabled-item-hovered': isHovered,
        }"
        :style="listItemStyle"
    >
        <div v-if="option.icon" class="qs-options-item-icon">
            <component :is="option.icon" />
        </div>
        <div class="qs-options-item-title">
            <div :style="{ color: optionTextColor }" class="qs-ellipsis">
                {{ option.title }}
            </div>
            <div
                v-if="option.description"
                class="qs-options-item-title-description qs-ellipsis"
                :style="{ color: optionDescriptionColor }"
            >
                {{ option.description }}
            </div>
        </div>
        <div
            v-if="option.suffixText"
            class="qs-option-item-suffix-text qs-ellipsis"
        >
            {{ option.suffixText }}
        </div>
    </label>
</template>

<style>
.qs-options-item {
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    user-select: none;
    border-radius: 0.25rem;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.05);
    height: 40px;
}
.qs-disabled-item-hovered {
    background: var(--qs-hover-bg-color);
}
.qs-disabled-item {
    opacity: 0.5;
}
.qs-options-children {
    margin-left: 1rem;
}
.qs-options-item-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
    display: flex;
    align-items: center;
}
.qs-options-item-title {
    flex: 1;
    font-size: 0.85rem;
    font-weight: 600;
    min-width: 0;
}
.qs-options-item-title-description {
    font-size: 0.7rem;
    font-weight: normal;
}
.qs-option-item-suffix-text {
    font-size: 0.8rem;
    max-width: 30%;
}
.qs-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
