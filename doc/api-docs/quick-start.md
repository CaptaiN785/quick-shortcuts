# Installation

---

Setup a Vue 3 projects

Install `quick-shortcuts` with npm

```bash
npm i quick-shortcuts
```

## Setup

Import `style.css` from library where `Shortcuts` component will be used.

```vue
import 'quick-shortcuts/dist/style.css'
```

**App.vue**

::: code-group

```vue{5-43,48}[Typescript]
<script setup lang="ts">
import { computed } from "vue";
import OptionIcon from "./components/OptionIcon.vue";

import "quick-shortcuts/dist/style.css";
import { Shortcuts } from "quick-shortcuts";
import type { Option } from "quick-shortcuts";

const options = computed<Option[]>(() => [
    {
        id: 1,
        title: "File",
        description: "File operations",
        icon: OptionIcon,
        isVisible: true,
        isDisabled: false,
        onSelect: () => alert("File selected"),
        children: [
            {
                id: 11,
                title: "New File",
                suffixText: "Create a new file",
                isVisible: true,
                onSelect: () => alert("New File selected"),
            },
            {
                id: 12,
                title: "Open File",
                suffixText: "Open an existing file",
                isVisible: true,
                onSelect: () => alert("Open File selected"),
            },
            {
                id: 13,
                title: "Save File",
                suffixText: "Save current progress",
                isVisible: true,
                onSelect: () => alert("Save File selected"),
            },
        ],
    },
])
</script>

<template>
    <div>
        <h2>Quick shortcuts tutorial with typescript</h2>
        <Shortcuts :options="options" />
    </div>
</template>
```

```vue{5-42,48}[Javascript]
<script setup>
import { computed } from "vue";
import OptionIcon from "./components/OptionIcon.vue";

import { Shortcuts } from "quick-shortcuts";
import "quick-shortcuts/dist/style.css";

const options = computed(() => [
    {
        id: 1,
        title: "File",
        description: "File operations",
        icon: OptionIcon,
        isVisible: true,
        isDisabled: false,
        onSelect: () => alert("File selected"),
        children: [
            {
                id: 11,
                title: "New File",
                suffixText: "Create a new file",
                isVisible: true,
                onSelect: () => alert("New File selected"),
            },
            {
                id: 12,
                title: "Open File",
                suffixText: "Open an existing file",
                isVisible: true,
                onSelect: () => alert("Open File selected"),
            },
            {
                id: 13,
                title: "Save File",
                suffixText: "Save current progress",
                isVisible: true,
                icon: OptionIcon,
                onSelect: () => alert("Save File selected"),
            },
        ],
    },
]);
</script>

<template>
    <div>
        <h2>Vue 3 Javascript tutorial</h2>
        <Shortcuts :options="options" />
    </div>
</template>
```

:::

Basic setup is done.

_Press `ctrl` + `k`_ for popup to appear. `k` is default key for shortcuts to trigger.

## Output

![](/qs.png)
