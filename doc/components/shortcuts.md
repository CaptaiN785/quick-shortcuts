# Shortcuts

**Import component**

```vue
import { Shortcuts } from 'quick-shortcuts'
```

## Types

```vue
import type { Option, StyleProp, SearchAlgoType } from "quick-shortcuts"
```

::: details Click to see props definition {open}

::: code-group

```ts[Option]
type OnSelectFunction = {
    (): void;
};

type Option = {
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
```

```ts[SearchAlgoType]
type SearchAlgoType = 'normal' | 'word-break'
```

```ts[StyleProp]
type StyleProp = {
	// Dialog
    dialogColor?: string
    dialogShadowColor?: string
    dialogBorderRadius?: string
    dialogZIndex?: number
    dialogHeight?: string
    dialogWidth: string

    // Title
    titleColor?: string
    titleFontSize?: string

    // Search
    searchTextColor?: string
    searchPlaceholder?: string
    searchPlaceholderColor?: string
    searchTextFontSize?: string

	// Option
    optionTextColor?: string
    optionDescriptionColor?: string
    optionHoverColor?: string
}

```

:::

### Usage

```vue
<Shortcuts
    searchAlgoType="normal"
    activationKey="m"
    dialogTitle="Quick shortcuts"
    :options="options"
    :customStyles="customStyles"
    @select="optionSelected"
/>
```

## Props

| Props            | Type                                        | Default    | Description                                                                                                    |
| ---------------- | ------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `activationKey`  | `string` - Optional                         | `k`        | Supported characters are `a-z`. It is used to trigger dialog. `Ctrl` will always be there. eg. `Ctrl` + `J`    |
| `searchAlgoType` | `SearchAlgoType` - Optional                 | `normal`   | It is a search algorithm type. Supported types are: `normal` and `word-break`. [Learn more](#search-algorithm) |
| `dialogTitle`    | `string` - Optional                         | Shortcuts  | Title show above the search input                                                                              |
| `customStyles`   | [`StyleProp`:link:](#types) - Optional      |            | Colors and font sizes for dialog                                                                               |
| `options`        | [`Option[]`:link:](#types) - **_Required_** | `undefine` | Data to render list of option for searching and performing actions                                             |

## Events

`change` - Trigger when any option is selected.

Function definition

```ts
function optionSelected(option: Option) {
    console.log('Selected option: ', option)
}
```

### Labelled image

![Labelled image](/labelled.png)

### Search algorithm

::: code-group

```ts[normal]
const stringMatching = (option: Option, searchQuery: string) => {
    const query = searchQuery.toLowerCase()
    if (!query) return true

    const { title, description, suffixText } = option

    return (
        title.toLowerCase().includes(query) ||
        description?.toLowerCase().includes(query) ||
        suffixText?.toLowerCase().includes(query)
    )
}
```

```ts[word-break] {open}
const workBreakStringMatching = (option: Option, searchQuery: string) => {
    const query = searchQuery.trim().toLowerCase().split(' ')
    if (!query.length) return true

    const { title, description, suffixText } = option

    const searchableString =`
		${title.toLowerCase()}
		${description?.toLowerCase() ?? ''}
		${suffixText?.toLowerCase() ?? ''}
	`
    return query.every((word) => searchableString.includes(word))
}
```

:::
