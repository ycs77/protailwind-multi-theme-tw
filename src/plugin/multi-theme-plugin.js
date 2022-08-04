const plugin = require('tailwindcss/plugin')
const Color = require('color')

const getRgbChannels = color => Color(color).rgb().array().join(' ')

module.exports = plugin.withOptions(
  function (themes) {
    return function ({ addBase, addVariant }) {
      // default theme
      const defaultThemeColors = themes[0].colors
      addBase({
        ':root': {
          '--color-text-base': getRgbChannels(defaultThemeColors['text-base']),
          '--color-text-inverted': getRgbChannels(defaultThemeColors['text-inverted']),
          '--color-bg-base': getRgbChannels(defaultThemeColors['bg-base']),
          '--color-bg-inverted': getRgbChannels(defaultThemeColors['bg-inverted']),
        }
      })
  
      // mutil theme
      themes.forEach(({ name, colors }) => {
        addBase({
          [`[data-theme="${name}"]`]: {
            '--color-text-base': getRgbChannels(colors['text-base']),
            '--color-text-inverted': getRgbChannels(colors['text-inverted']),
            '--color-bg-base': getRgbChannels(colors['bg-base']),
            '--color-bg-inverted': getRgbChannels(colors['bg-inverted']),
          }
        })
      })

      // themes variants
      themes.forEach(({ name }) => {
        addVariant(`theme-${name}`, `[data-theme=${name}] &`)
      })
    }
  },

  // config
  function () {
    return {
      theme: {
        extend: {
          textColor: {
            multi: {
              base: 'rgb(var(--color-text-base) / <alpha-value>)',
              inverted: 'rgb(var(--color-text-inverted) / <alpha-value>)',
            },
          },
          backgroundColor: {
            multi: {
              base: 'rgb(var(--color-bg-base) / <alpha-value>)',
              inverted: 'rgb(var(--color-bg-inverted) / <alpha-value>)',
            },
          },
        },
      },
    }
  }
)
