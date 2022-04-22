![](https://img.shields.io/github/workflow/status/jakecastelli/trongate-vscode/Node.js%20CI/master?style=flat)
![](https://img.shields.io/visual-studio-marketplace/i/jc-sf.Trongate)
![](https://img.shields.io/visual-studio-marketplace/v/jc-sf.Trongate)
![](https://img.shields.io/visual-studio-marketplace/stars/jc-sf.Trongate)
![][1]

![Trongate-logo](https://user-images.githubusercontent.com/7813262/163671158-6b9f1058-b2e9-4cd0-9edf-05b74198d9f4.gif)

# Scaffold & Code Snippets

<!-- > Would you like to code faster?  I know I certainly would! 👀️ -->

> This is a Visual Studio Code extension to compliment the Trongate ecosystem. Consisting of the Trongate framework and the Desktop-app. All tirelessly written by David Connelly, who I'd like to make special mention here for his continued dedication and commitment in keeping the web development doors open to everyone.

## Features

### New Trongate Module

A module is an essential building block of the Trongate Framework's HMVC architecture. However, creating a module from scratch is tedious and requires you to constantly concentrate on creating and naming your folders and files correctly. Then typing boilerplate code which becomes repetitive and open to errors. This is where this feature will help speed up the process with precision accuracy to create the module for you.

<hr>

- Quick Start
  - Ensure you have opened a Trongate project in your workspace
    - Right click on the modules folder for creating a general module or
    - Alternativly create a sub-module by right clicking on the parent module folder
    - Then select '`New Trongate Module`' and give it a module name
  - If you want a view template
    - Then you will need to give it a name for your view file.
      - An example would be '`display`'

<hr>

- Create a scaffold module on the fly
  - The extension can figure out what you are creating if it is a general module or a sub module, and give you the corresponding code.
  - With a starter class (default option), complete with api.json in the assets folder ready for you to create whatever is on your mind - enjoy!
  - With a view template, it allows you to name your view file and gives you a starter function `index` to guide you on the road.
  - now with v1.0.1+ you can create a view, complete with module specific linked CSS and JavaScript files
- Prevent module naming errors
  - The extension will dynamically read your `config.php` and extract the `MODULE_ASSETS_TRIGGER`, if you accidentally name your module the same as the `MODULE_ASSETS_TRIGGER`, the process will terminate and you would be notified. This is a handy feature to avoid a blank screen.

![vsc-101-view](https://user-images.githubusercontent.com/7813262/97399997-6c461400-1942-11eb-91c0-41658b5664ec.gif)

<hr>

### Add PHP and custom Trongate code snippets to speed up your development.

<br>

### `Table of helpful Trongate snippets:`

| Snippet Name                           | Prefix                        |
| -------------------------------------- | ----------------------------- |
| Trongate For Loop In View File         | `tg:for`                      |
| Trongate if condition in View File     | `tg:if`                       |
| Trongate if else in View File          | `tg:ifelse`                   |
| Trongate Submit Function Scaffold      | `tg:submit`                   |
| Create new class the extends Trongate  | `tgc`                         |
| Create new method with or without args | `tgm`, `tgm1`, `tgm2`, `tgm3` |
| Add an acnchor with url                | `tga`                         |
| Insert a Template                      | `tgt`                         |
| Add [$data] = ''                       | `tgde`                        |
| Add [$data] = $this->                  | `tgdl`                        |
| Quick php insert variable              | `tgev`                        |
| Quick php insert environment variable  | `tge`                         |

![snippets2](https://user-images.githubusercontent.com/7813262/95720453-fd6b8880-0cbc-11eb-9eb7-bf7e170e0090.gif)

<br>

# NITRO

A desktop app created by David Connelly originally for [Speed Coding Academy](https://www.speedcodingacademy.com/) members using Sublime Text 3 only but now available to VS Code users.

### New to this release:

- Click on the CSS framework name in the bottom status bar to quickly change frameworks
- The Trongate CSS has been added and is now the default framework

### Features

- Insert popular frontend CSS frameworks and their elements into your view and template files

Use `ctrl+win+alt+/` to bring up the dropdown selector to select your frontend framework

- [Trongate](https://trongate.io/docs_m/information/introducing-trongate-css) > tg:t
- [Bootstrap 4](https://getbootstrap.com/) > tg:b
- [Defiant](https://defiantcss.com/) > tg:d
- [Materialize](https://materializecss.com/) > tg:ma
- [Milligram](https://milligram.com/) > tg:mi
- [Skeleton](http://getskeleton.com/) > tg:s

<br>

#### Table of Nitro inserts > Showing the Trongate CSS prefixes below:

| Command             | Shortcut         | Prefix               |
| ------------------- | ---------------- | -------------------- |
| Buttons             | `ctrl+win+alt+b` | `tg:t:button`        |
| BUttons Alternative | `ctrl+win+alt+u` | `tg:t:button-alt`    |
| Contact Form        | `ctrl+win+alt+c` | `tg:t:contact`       |
| Download URL        | `ctrl+win+alt+d` | `tg:t:url`           |
| Form                | `ctrl+win+alt+f` | `tg:t:form`          |
| Grid                | `ctrl+win+alt+g` | `tg:t:grid`          |
| Info Page           | `ctrl+win+alt+i` | `tg:t:info`          |
| Login Form          | `ctrl+win+alt+l` | `tg:t:login`         |
| Modal               | `ctrl+win+alt+m` | `tg:t:modal`         |
| Password Form       | `ctrl+win+alt+p` | `tg:t:password-form` |
| Table               | `ctrl+win+alt+t` | `tg:t:table`         |
| TAble Alternative   | `ctrl+win+alt+a` | `tg:t:table-alt`     |
| TEmplate            | `ctrl+win+alt+e` | `tg:t:template`      |

<br>PLEASE NOTE: The `win` key is the same as `super` in Linux and `cmd` on Mac<br><br>

![css](https://user-images.githubusercontent.com/7813262/95720033-6ef70700-0cbc-11eb-98b2-ba4eb908dd48.gif)

## Requirements

You will need the Trongate Framework of course! ❤️

## Why you should use Trongate Framework?

- Imagine a PHP framework that allowed you to build large scale enterprise applications in minutes instead of months.
- Imagine a framework that did NOT get rewritten constantly.
- Imagine a framework that you could learn once and use for a lifetime.
- Imagine a framework that was V1 forever!

## You've just imagined [Trongate](https://trongate.io)

![intro](https://user-images.githubusercontent.com/7813262/95190011-6749e500-081a-11eb-8317-5561a7241e6e.png)

Please report any issues or suggestions on our repo

[1]:https://img.shields.io/badge/Trongate%20Framework-eco--system-blue?logo=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAQABADAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQYH/8QAJRAAAQMDBAICAwAAAAAAAAAAAgEDBQQGBwgREiEAMRMUQWFx/8QAGQEAAQUAAAAAAAAAAAAAAAAABQABAgQH/8QAIREAAgEDBAMBAAAAAAAAAAAAAQIRAAMEBQYhMUFRcRL/2gAMAwEAAhEDEQA/ALrRjgTG1yY0lr7zXRRxR9xSDMXCDWGjJIYHtzaNVReRuFwRE98F81vdW5M+3lpY09iCgJaOe/fwc0Ps21iWoHWZpUt/DsXT35YROhEPPpT1FK6XL4yL1sv92/XvpNu7O193ZOoOcfKMt2DTXbKrytFaS8ewN6HE3ZlHKlLRQFoSPzQ0JUSwNr9kTFwlVpxdgbJVFdx7VUXwZree9kNaxbcs4hmjx12PNJR7rcdd1xxl9YfbatHINtVFPGVo1sjRhItG/UgicQFoRVVJUIt1TrpN/wAeBdtI2JlzdQyRAMcD7UnP6Ff/2Q==
