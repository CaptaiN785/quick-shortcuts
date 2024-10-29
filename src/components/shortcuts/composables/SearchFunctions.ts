import { Option } from '../../../types/options'
import { SearchAlgoType } from '../../../types/props'

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

const workBreakStringMatching = (option: Option, searchQuery: string) => {
    const query = searchQuery.trim().toLowerCase().split(' ')
    if (!query.length) return true

    const { title, description, suffixText } = option

    const searchableString = `${title.toLowerCase()} ${description?.toLowerCase() ?? ''} ${suffixText?.toLowerCase() ?? ''}`
    return query.every((word) => searchableString.includes(word))
}

export const isOptionValid = (
    option: Option,
    searchQuery: string,
    searchAlgoType: SearchAlgoType,
) => {
    if (searchAlgoType === 'word-break') {
        return workBreakStringMatching(option, searchQuery)
    } else {
        // Default search algo is normal
        return stringMatching(option, searchQuery)
    }
}
