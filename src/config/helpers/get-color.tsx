import ImageColors from 'react-native-image-colors'

export const useImageColors = async (image: string) => {
    const fallbackColor = 'grey';
    const colors = await ImageColors.getColors(image, {
        fallback: fallbackColor
    });


    switch (colors.platform) {
        case 'android':
            return colors.dominant ?? fallbackColor;
            case 'ios':
                return colors.primary ?? fallbackColor;
        default:
            return fallbackColor;
    }
}