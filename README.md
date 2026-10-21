# PinterestUI+

**PinterestUI+** is a userscript that redesigns Pinterest on the web with the iPhone app design language:
dark mode, rounded cards, a glass header, a floating tab bar, and an iOS-style settings sheet.

| File | Purpose |
| --- | --- |
| `pinterestui-plus.user.js` | The userscript itself (this is what you install). |
| `pinterest-logo.svg` | The Pinterest logo, used in the settings sheet header and in the userscript manager. |
| `LICENSE` | The MIT license. |

## Installation

1. Install a userscript manager: [Violentmonkey](https://violentmonkey.github.io/get-it/) (preferred) or Tampermonkey.
2. Open the manager panel → "Create a new script" → paste the contents of `pinterestui-plus.user.js` → save.
   (Or drag the file into a browser window if your manager supports it.)
3. Open `pinterest.com` and reload the page.
4. You will find the floating gear button at the bottom left, and the settings icon in the bottom bar.

## Features

- **Three dark mode variants:** Auto (follows the system), Dark, and AMOLED (pure black).
- **Full restyle:** rounded corners on cards, buttons and fields, a soft shadow on hover, a translucent header with a backdrop blur, a thin scrollbar, and text selection in the accent color.
- **Floating tab bar** in the app style: Home, Explore, Search, Create, Settings.
- **Darkening light surfaces:** Pinterest builds its colors with generated classes that no static CSS can know, so the script reads the computed color of important elements and turns the white ones into the surface color. This is what makes dark mode cover dialogs and menus, not just the page.
- **Optional clean-up:** hiding promoted pins and shopping modules.
- **Settings are saved** in `localStorage` under the key `pinterest-app-look.settings.v1`. The key keeps the original project name on purpose, so renaming the project never wipes the settings of existing installs.
- **A button in the userscript manager menu** to open the settings.

## Settings

| Setting | Effect |
| --- | --- |
| Theme | Light / Dark / AMOLED / Auto. |
| Accent color | Pinterest red, iOS blue, violet, green, orange. |
| Corner radius | From 8 to 28 pixels, applied to cards, buttons and dialogs. |
| Darken light surfaces | Enables or disables the JavaScript pass that paints white surfaces. |
| Hide promoted pins | Hides cards carrying a `Promoted` / `Sponsored` label (or `ممول` on the Arabic interface). |
| Hide shopping modules | Hides store and product modules. |
| Compact header | Reduces the header padding. |
| Floating dock | Shows or hides the navigation bar. |

## How it works (short version)

1. At `document-start` a single stylesheet is injected and the theme attributes are set on `<html>` before the first paint, so the page never flashes white.
2. The whole design runs on CSS variables (`--pa-bg`, `--pa-surface`, `--pa-r`, `--pa-accent`), so changing the theme rebuilds nothing — it is only a set of attribute swaps.
3. The interface (the sheet, the dock and the button) lives in a **Shadow DOM**, so Pinterest's own CSS cannot affect it and it does not pollute the page.
4. A `MutationObserver` catches new content while you scroll and schedules a deferred painting pass (`requestIdleCallback`), remembering every element it has already inspected so nothing is measured twice.

## Known limits

- **I could not test the script on the real Pinterest from here** (this browser session cannot drive the page). The `data-test-id` selectors are based on Pinterest's common markup and may need adjusting if the site changes its structure.
- If dark mode does not show up in a particular window, the reason is usually that Pinterest paints its background with `background` rather than `background-color`, or that the content sits inside an `iframe` (the script does not run inside frames).
- Hiding promoted pins depends on the element carrying a `Promoted` / `Sponsored` label (or `ممول` on the Arabic interface). Pins without such a label will not be hidden — use uBlock Origin for the remaining cases.
- `body` gets 96px of bottom padding while the floating bar is enabled, so it does not cover the last row of cards.

## Quick customization

- **Colors:** edit the `:root` and `html[data-pa-theme="dark"]` variables at the top of `PAGE_CSS`.
- **Accent colors:** add a key to `ACCENTS`, then add a button in `UI_MARKUP` with the matching `data-accent-option`.
- **Selectors:** everything Pinterest-specific lives inside `PAGE_CSS`, split into numbered sections (header, cards, buttons, dialogs…). Start there whenever the site changes.
- **Default radius:** change `radius` in `DEFAULTS`.

## License

MIT — the full text is in [`LICENSE`](LICENSE).
