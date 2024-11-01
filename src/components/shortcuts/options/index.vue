<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Option } from '../../../types/options'
import OptionItem from './OptionItem.vue'
import { isOptionValid } from '../composables/SearchFunctions'
import { SearchAlgoType } from '../../../types/props'
// @ts-ignore
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const hoveredItem = ref<number>(-1)
const previousMousePosition = ref<{
    x: number
    y: number
}>({
    x: 0,
    y: 0,
})
const recycleScrollerRenderingKey = ref<number>(1)

const { options, optionsStyle, searchQuery, searchAlgoType } = defineProps<{
    options: Option[]
    searchQuery: string
    searchAlgoType: SearchAlgoType
    optionsStyle: {
        optionTextColor: string
        optionDescriptionColor: string
        optionHoverColor: string
    }
}>()

const emit = defineEmits<{
    select: [Option]
}>()

const allOptions = computed<Option[]>(() => {
    return options.reduce<Option[]>((acc, option) => {
        const children = (option.children ?? [])
            .map((child) => ({
                ...child,
                isChild: true,
            }))
            .filter((option) =>
                isOptionValid(option, searchQuery, searchAlgoType),
            )
        if (children.length) {
            // if children is valid, show their parent
            return [...acc, { ...option, children: [] }, ...children]
        }
        const validOption = [{ ...option, children: [] }].filter((option) =>
            isOptionValid(option, searchQuery, searchAlgoType),
        )
        return [...acc, ...validOption]
    }, [])
})

const isEmptyList = computed<boolean>(() => !allOptions.value.length)

function upArrowPressed() {
    hoveredItem.value = Math.max(hoveredItem.value - 1, 0)
}
function downArrowPressed() {
    hoveredItem.value = (hoveredItem.value + 1) % allOptions.value.length
}

function hoverItem(index: number, e: MouseEvent) {
    const { x, y } = e
    const { x: prevX, y: prevY } = previousMousePosition.value
    if (x !== prevX && y !== prevY) {
        // Prevent auto hover on scrolling option item
        hoveredItem.value = index
        previousMousePosition.value = { x, y }
    }
}

function clickOptionItem(index: number) {
    if (!allOptions.value.length) return
    hoverItem(index, {
        x: previousMousePosition.value.x + 10,
        y: previousMousePosition.value.y + 10,
    } as MouseEvent)

    const selectedIndex = Math.max(
        0,
        Math.min(index, allOptions.value.length - 1),
    )
    if (allOptions.value[selectedIndex].isDisabled) return
    emit('select', allOptions.value[selectedIndex])
}

function enterPressed() {
    clickOptionItem(hoveredItem.value)
}

defineExpose({
    upArrowPressed,
    downArrowPressed,
    enterPressed,
})

const query = computed(() => searchQuery)

watch(
    query,
    () => {
        hoveredItem.value = 0
    },
    { immediate: true, deep: true },
)

const allOptionsLength = computed(() => allOptions.value.length)

watch(allOptionsLength, (newVal, oldVal) => {
    if (oldVal == 0 && newVal > 0) {
        recycleScrollerRenderingKey.value += 1
    }
})

// End of script
</script>

<template>
    <div class="qs-options-list">
        <RecycleScroller
            :key="recycleScrollerRenderingKey"
            style="height: inherit"
            class="scroller"
            :items="allOptions"
            :item-size="64"
            key-field="id"
        >
            <template v-slot="{ item: option, index }">
                <OptionItem
                    :key="option.id"
                    :option="option"
                    :optionsStyle="optionsStyle"
                    :isHovered="index === hoveredItem"
                    @mouseover="($event) => hoverItem(index, $event)"
                    @click="clickOptionItem(index)"
                />
            </template>
            <template #empty>
                <div
                    v-if="isEmptyList"
                    class="qs-no-results"
                    :style="{ color: optionsStyle.optionTextColor }"
                >
                    No results
                </div>
            </template>
        </RecycleScroller>
    </div>
</template>

<style>
.qs-options-list {
    overflow-y: auto;
    padding-top: 0.5rem;
    scroll-behavior: smooth;
    list-style: none;
    padding-inline-start: 0;
    scroll-behavior: smooth;
    height: 300px;
}
.qs-options-list li:not(:last-child) {
    margin-bottom: 0.25rem;
}
.qs-no-results {
    padding: 1rem;
    text-align: center;
}
</style>
