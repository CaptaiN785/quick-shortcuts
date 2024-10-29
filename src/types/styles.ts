export type Style = {
    // Main dialog/modal
    dialogColor: string
    dialogShadowColor: string
    dialogBorderRadius: string
    dialogZIndex: number
    dialogHeight: string
    dialogWidth: string

    // Title
    titleColor: string
    titleFontSize: string

    // Search input
    searchTextColor: string
    searchPlaceholder: string
    searchPlaceholderColor: string
    searchTextFontSize: string

    // Options
    optionTextColor: string
    optionDescriptionColor: string
    optionHoverColor: string
}

export type StyleProp = Partial<Style>
