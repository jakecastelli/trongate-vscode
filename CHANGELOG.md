# Change Log

All notable changes to the "trongate" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## Release Notes

### v1.1.0
- Added option to select a CSS Framework from the status bar #37
- Added Trongate CSS as default CSS Framework and related snippets #40
- Fixed warning for issue #32
- Fixed github action script #36

### v1.0.3
- Small fix to the snippet tgm, tgm1, tgm2, tgm3
- Adjusted the cursor position for snippet tg:submit

### v1.0.2
- Name your view file when you choose to have a view template
- Sub-module support - the extension can figure out automatically for you whether you are creating a general module or a sub-module
- Prevent module naming errors - if your module name which contains the `MODULE_ASSETS_TRIGGER`, it will stop you and let you know

### v1.0.1
- dropdown options menu when creating a new module
  - you can choose 'no' (default) to create a class only
  - or choose 'yes' to create a view, with linked CSS and JavaScript files
- added new snippet > tge that will display a dropdown menu of common environment variables
  - BASE_URL, WEBSITE_NAME, OUR_NAME, OUR_TELNUM, OUR_ADDRESS & OUR_EMAIL_ADDRESS
### v1.0.0
- Added full support akin to the Nitro desktop app
- Dropdown selector and notifications when switched
- See above table for full keyboard shortcuts and prefixes
- Added persistence when frontend framework is chosen
- Added status bar message to remind you which frontend framework is active

### v0.0.1
- Initial release
