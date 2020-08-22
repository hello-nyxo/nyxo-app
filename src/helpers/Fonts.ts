import { Platform } from 'react-native'

type fontFormats = 'ttf' | 'otf'

/**
 * example of usage:
  
  const originalHtml = "<div/>"
  const css = generateAssetsFontCss("Roboto-Dark", "ttf")
 
  const html = addCssToHtml(originalHtml, css)
 * 
 * @param fontFileName - font name in resources
 * @param fileFormat - ttf or otf
 * @returns {string} - css for webview
 */
export const generateAssetsFontCss = (
  fontFileName: string,
  fileFormat: fontFormats = 'ttf'
) => {
  const fileUri = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`
  })

  return `
	@font-face {
        	font-family: '${fontFileName}';
        src: local('${fontFileName}'), url('${fileUri}') format('${
    fileFormat === 'ttf' ? 'truetype' : 'opentype'
  }');
	}
	`
}
