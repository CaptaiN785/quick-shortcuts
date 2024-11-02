import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Quick shortcuts',
    description:
        'A vue 3 + Typescript UI library to provide quick search functionality',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'API docs', link: '/api-docs/quick-start' },
        ],
        sidebar: [
            {
                text: 'API docs',
                items: [
                    {
                        text: 'Quick start',
                        link: '/api-docs/quick-start',
                    },
                ],
            },
            {
                text: 'Components',
                items: [
                    {
                        text: 'Shortcuts',
                        link: 'components/shortcuts',
                    },
                ],
            },
        ],
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/CaptaiN785/quick-shortcuts',
            },
        ],
        search: {
            provider: 'local',
            options: {
                detailedView: 'auto',
            },
        },
    },
    base: '/quick-shortcuts/',
})
