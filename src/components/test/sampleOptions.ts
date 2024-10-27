import OptionIcon from './OptionIcon.vue'
import { Option } from '../shortcuts/types/options'

export const options: Option[] = [
    {
        id: '1',
        title: 'Dashboard',
        description: 'View your dashboard',
        isVisible: true,
        onSelect: () => {
            console.log('Dashboard is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Quick access',
        children: [
            {
                id: '1-1',
                title: 'Overview Get an overview of your stats',
                description: 'Get an overview of your stats',
                isVisible: true,
                onSelect: () => {
                    console.log('Overview is clicked')
                },
                icon: OptionIcon,
                suffixText: 'Summary',
            },
            {
                id: '1-2',
                title: 'Reports',
                description: 'View detailed reports',
                isVisible: true,
                onSelect: () => {
                    console.log('Reports are clicked')
                },
                icon: OptionIcon,
                suffixText: 'Analysis',
            },
            {
                id: '1-3',
                title: 'Settings',
                description: 'Configure your preferences',
                isVisible: true,
                onSelect: () => {
                    console.log('Settings are clicked')
                },
                icon: OptionIcon,
                suffixText: 'Manage',
            },
        ],
    },
    {
        id: '2',
        title: 'Profile',
        description: 'Manage your profile settings',
        isVisible: true,
        onSelect: () => {
            console.log('Profile is clicked')
        },
        icon: OptionIcon,
        suffixText: 'User settings',

        isDisabled: false,
    },
    {
        id: '3',
        title: 'Notifications',
        description: 'Check your notifications',
        isVisible: true,
        onSelect: () => {
            console.log('Notifications are clicked')
        },
        icon: OptionIcon,
        suffixText: 'Alerts',
    },
    {
        id: '4',
        title: 'Messages',
        description: 'Read your messages',
        isVisible: true,
        onSelect: () => {
            console.log('Messages are clicked')
        },
        icon: OptionIcon,
        suffixText: 'Inbox',
    },
    {
        id: '5',
        title: 'Help',
        description: 'Get help and support',
        isVisible: true,
        onSelect: () => {
            console.log('Help is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Support',
    },
    {
        id: '6',
        title: 'Feedback',
        description: 'Provide your feedback',
        isVisible: true,
        onSelect: () => {
            console.log('Feedback is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Your thoughts',
    },
    {
        id: '7',
        title: 'Logout',
        description: 'Sign out of your account',
        isVisible: true,
        onSelect: () => {
            console.log('Logout is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Exit',
    },
    {
        id: '8',
        title: 'Privacy',
        description: 'Manage privacy settings',
        isVisible: true,
        onSelect: () => {
            console.log('Privacy is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Security',
    },
    {
        id: '9',
        title: 'Language',
        description: 'Change your language preferences',
        isVisible: true,
        onSelect: () => {
            console.log('Language is clicked')
        },
        icon: OptionIcon,
        suffixText: 'Localization',
    },
    ...Array.from({ length: 290 }, (_, index) => ({
        id: `10-${index + 1}`,
        title: `Option ${index + 11}`,
        description: `Description for option ${index + 11}`,
        isVisible: true,
        onSelect: () => {
            console.log(`Option ${index + 11} is clicked`)
        },
        icon: OptionIcon,
        suffixText: `Additional info ${index + 11}`,
    })),
]
