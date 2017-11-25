/**
 * Define all the styles that are in-lined
 * For regular CSS styles, see the corresponding CSS file
 * 
 */
export type ValueSliderStyle = {
    slider: {
        root: React.CSSProperties;
        slider: React.CSSProperties;
    }
};
export const style: ValueSliderStyle = {
    slider: {
        root: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: ('column' as 'column'),
            alignItems: ('center' as 'center'),
            justifyContent: ('center' as 'center')
        },
        slider: {
            marginTop: 10,
            marginBottom: 10
        }
    }
};