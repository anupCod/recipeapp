const darkTheme = {
    background: '#2C2C2E',         // Rich dark brown-black
    primaryText: 'orangered',        // Off-white for comfort
    secondaryText: 'white',      // Light coffee-gray
    cardBackground: '#FFF9F4',     // Dark brown-gray for elevated surfaces
    button: 'orangered',             // Softer orange that pops on dark
    buttonText: '#1C1B1A',         // Dark text on light button for contrast
    accent: '#FF5722',             // Warm peach accent
    border: '#1C1C1E',             // Soft shadowy border
    successGreen: '#A5D6A7',
    warningRed: '#FF6E6E',
    shadow:'white',
    tab:'#FFF9F4'
}

const lightTheme ={
    background: '#FFF9F4',         // Soft cream background for warmth
    primaryText: 'orangered',        // Rich dark brown for readability
    secondaryText: 'black',      // Warm gray for muted info
    cardBackground: '#ffffff',     // Clean white for cards
    button: 'orangered',             // Appetizing tangerine orange for CTA
    buttonText: '#FFFFFF',         // High contrast on buttons
    accent: '#FF5722',             // Bright orange for highlights (e.g., price tags)
    border: '#E0D7CE',             // Light warm gray for soft borders
    successGreen: '#81C784',       // For healthy recipes or success messages
    warningRed: '#E53935',
    shadow:'black',
    tab:'#1C1C1E'
}


export const THEMES = {
    light:lightTheme,
    dark:darkTheme,
}

/* export const COLORS = THEMES.light; // Default to light and can be switched afterwards */