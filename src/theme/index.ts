import { buttonClasses, createTheme } from '@mui/material'
import { JUICY_PALETTE } from './colors'
import { fonts } from './fonts'
import { JuicyPalette } from '@/types/color'
const IBM_PLEX_SANS_FONT_FAMILY = 'IBM Plex Sans'

declare module '@mui/material/styles' {
	interface Palette {
		juicy: JuicyPalette;
	}
	interface PaletteOptions {
		juicy: JuicyPalette;
	}
}

export const theme = createTheme({
	palette: {
		juicy: JUICY_PALETTE,
		background: {
			default: JUICY_PALETTE.neutral[20],
		},
	},
	typography: {
		fontFamily: [IBM_PLEX_SANS_FONT_FAMILY, IBM_PLEX_SANS_FONT_FAMILY].join(','),
		h3: undefined,
		h4: undefined,
		h5: undefined,
		h6: undefined,
		subtitle1: undefined,
		subtitle2: undefined,
		allVariants: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			color: JUICY_PALETTE.primary[100],
			fontSize: '1rem',
		},
		h1: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '2rem',
			'@media screen and (max-width: 416px)': {
				fontSize: '1.5rem',
			},
		},
		h2: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '1.5rem',
			'@media screen and (max-width: 416px)': {
				fontSize: 16,
			},
		},
		button: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body1: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body2: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: Object.values(fonts).join('\n'),
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontWeight: 300,
					color: JUICY_PALETTE.neutral[70],
					paddingRight: 40,
					'&.Mui-selected': {
						fontWeight: 500,
						color: JUICY_PALETTE.primary[60],
					},
					'&:not(.Mui-selected):hover': {
						color: JUICY_PALETTE.neutral[80],
					},
					'&:hover::before': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 2,
						backgroundColor: JUICY_PALETTE.neutral[50],
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					background: JUICY_PALETTE.primary[60],
					height: 2,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderBottomWidth: 2,
					borderColor: JUICY_PALETTE.neutral[30],
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					padding: '8px 24px',
					boxShadow: 'none',
				},
			},
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						textTransform: 'none',
						color: JUICY_PALETTE.neutral[100],
						borderColor: JUICY_PALETTE.neutral[50],
						'&:hover': {
							background: JUICY_PALETTE.neutral[30],
							borderColor: JUICY_PALETTE.neutral[50],
						},
						'&:active': {
							background: JUICY_PALETTE.neutral[40],
							borderColor: JUICY_PALETTE.neutral[50],
						},
						[`& .${buttonClasses.icon}`]: {
							color: JUICY_PALETTE.neutral[60],
						},
					},
				},
				{
					props: { variant: 'contained' },
					style: {
						textTransform: 'none',
						background: JUICY_PALETTE.primary[60],
						'&:hover': {
							boxShadow: 'none',
							background: JUICY_PALETTE.primary[70],
						},
						'&:active': {
							boxShadow: 'none',
							background: JUICY_PALETTE.primary[80],
						},
						'&:disabled': {
							color: JUICY_PALETTE.neutral[60],
							background: JUICY_PALETTE.neutral[50],
						},
					},
				},
				{
					props: { variant: 'text' },
					style: {
						textTransform: 'none',
						'&:hover': { background: JUICY_PALETTE.primary[10] },
						'&:active': { background: JUICY_PALETTE.primary[20] },
					},
				},
				{
					props: { size: 'large' },
					style: {
						height: '3rem',
						minWidth: '10rem',
						fontSize: '0.925rem',
					},
				},
				{
					props: { size: 'medium' },
					style: {
						fontSize: '0.9rem',
					},
				},
				{
					props: { size: 'small' },
					style: {
						height: '2rem',
					},
				},
			],
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					display: 'flex',
					textTransform: 'none',
					justifyContent: 'start',
					gap: '8px',
					padding: '16px 24px',
					color: JUICY_PALETTE.primary[30],
					fontWeight: 400,
					borderRadius: 0,
					border: 'none',
					fontSize: '14px',
					height: '56px',
					'& svg': {
						fill: JUICY_PALETTE.primary[30],
						width: '20px',
						height: '20px',
					},
					'&.Mui-selected': {
						color: JUICY_PALETTE.neutral[10],
						background: JUICY_PALETTE.primary[40],
						borderLeft: `4px solid ${JUICY_PALETTE.neutral[10]}`,
						paddingLeft: '20px',
						':hover': {
							background: JUICY_PALETTE.primary[40],
							transition: '0.3s',
						},
						'& svg': {
							fill: JUICY_PALETTE.neutral[10],
						},
					},
					'&:hover': {
						background: JUICY_PALETTE.primary[40],
						transition: '0.3s',
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					padding: '8px 16px',
					fontSize: 16,
					'&:hover': {
						backgroundColor: JUICY_PALETTE.neutral[20],
					},
					'&.Mui-selected': {
						backgroundColor: JUICY_PALETTE.neutral[30],
						color: JUICY_PALETTE.primary[60],
						fontWeight: 500,
					},
					'&.Mui-selected:hover': {
						backgroundColor: JUICY_PALETTE.neutral[30],
					},
					'&.Mui-focusVisible': {
						outline: `2px solid ${JUICY_PALETTE.primary[60]}`,
						outlineOffset: '-2px',
					},
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
			},
		},
		MuiFormControl: {
			defaultProps: {
				variant: 'filled',
			},
			styleOverrides: {
				root: {
					width: '100%',
				},
			},
		},
		MuiInputBase: {
			defaultProps: {
				style: {
					borderRadius: 0,
				},
			},
		},
	},
})