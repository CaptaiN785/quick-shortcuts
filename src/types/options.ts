import type { Component } from 'vue'

type OnSelectFunction = { (): void }

export type Option = {
    id: string | number
    title: string
    description?: string
    suffixText?: string
    icon?: Component
    isVisible: boolean
    isDisabled?: boolean
    onSelect?: OnSelectFunction
    children?: Omit<Option, 'children'>[]
}
