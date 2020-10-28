# Trongate Scaffold & Code Snippets

Would you like to code faster?  I know I certainly would! 👀️

This is a Visual Studio Code extension to compliment the Trongate ecosystem.   Consisting of the Trongate framework, Desktop-app and Nitro.  All tirelessly written by David Connelly, who I'd like to make special mention here for his continued dedication and commitment in keeping the web development doors open to everyone.

* Imagine a PHP framework that allowed you to build large scale enterprise applications in minutes instead of months.
* Imagine a framework that did NOT get rewritten constantly.
* Imagine a framework that you could learn once and use for a lifetime.
* Imagine a framework that was V1 forever!

# You've just imagined Trongate.io


![intro](https://user-images.githubusercontent.com/7813262/95190011-6749e500-081a-11eb-8317-5561a7241e6e.png)

## Features

This extension will allow you to:

* Create a module directory scaffold
  * with a starter class, complete with asset.json ready for you to create whatever is on your mind - enjoy!
  * now with v1.0.2+ you can create a view, complete with linked CSS and JavaScript files

![vsc-102-view](https://user-images.githubusercontent.com/7813262/97399997-6c461400-1942-11eb-91c0-41658b5664ec.gif)


* Add PHP and custom Trongate code snippets to speed up your development.



#### Table of helpful Trongate snippets:
| Snippet Name | Prefix 
| ------------- | ------------- 
| Trongate For Loop In View File | `tg:for` |
| Trongate if condition in View File | `tg:if` | 
| Trongate if else in View File | `tg:ifelse` | 
| Trongate Submit Function Scaffold | `tg:submit` | 
| Create new class the extends Trongate | `tgc` |
| Create new method with or without args | `tgm`, `tgm1`, `tgm2`, `tgm3` |
| Add an acnchor with url | `tga` |
| Insert a Template | `tgt` |
| Add [$data] = '' | `tgde` |
| Add [$data] = $this-> | `tgdl` |
| Quick php insert variable | `tgev` |
| Quick php insert environment variable | `tge` |


![snippets2](https://user-images.githubusercontent.com/7813262/95720453-fd6b8880-0cbc-11eb-9eb7-bf7e170e0090.gif)

* Insert popular frontend frameworks and their elements into your view and template files - akin to the Nitro desktop app developed by David Connelly and can be downloaded at https://www.speedcodingacademy.com/ if you are a member of course.

Use `ctrl+win+alt+/` to bring up the dropdown selector to select your frontend framework
* Bootstrap 4 > tg:b
* Defiant > tg:d
* Materialize > tg:ma
* Milligram > tg:mi
* Skeleton > tg:s

#### Table of Nitro Frameworks Inserts > Showing Bootstrap 4:
| Command | Shortcut | Prefix
| ------------- | ------------- | -------------
| Buttons | `ctrl+win+alt+b` | `tg:b:button`
| BUttons Alternative | `ctrl+win+alt+u` | `tg:b:button-alt`
| Contact Form | `ctrl+win+alt+c` | `tg:b:contact`
| Download URL | `ctrl+win+alt+d` | `tg:b:url`
| Form | `ctrl+win+alt+f` | `tg:b:form`
| Grid | `ctrl+win+alt+g` | `tg:b:grid`
| Info Page | `ctrl+win+alt+i` | `tg:b:info`
| Login Form | `ctrl+win+alt+l` | `tg:b:login`
| Modal | `ctrl+win+alt+m` | `tg:b:modal`
| Password Form | `ctrl+win+alt+p` (win/linux) <hr> `ctrl+cmd+alt+o` (mac) | `tg:b:password-form`
| Table | `ctrl+win+alt+t` | `tg:b:table`
| TAble Alternative | `ctrl+win+alt+a` | `tg:b:table-alt`
| TEmplate | `ctrl+win+alt+e` | `tg:b:template`

<br>PLEASE NOTE: The `win` key is the same as `super` in Linux and `cmd` on Mac<br><br>

![css](https://user-images.githubusercontent.com/7813262/95720033-6ef70700-0cbc-11eb-98b2-ba4eb908dd48.gif)

## Requirements

You will need the Trongate Framework of course! ❤️

## Known Issues

No known issues to report 👍

## Release Notes

### .0.0.1
* Initial release


### 1.0.0
* Added full support akin to the Nitro desktop app
* Dropdown selector and notifications when switched
* See above table for full keyboard shortcuts and prefixes
* Added persistence when frontend framework is chosen
* Added status bar message to remind you which frontend framework is active

### 1.0.2
* dropdown options menu when creating a new module
  * you can choose 'no' (default) to create a class only
  * or choose 'yes' to create a view, with linked CSS and JavaScript files
* added new snippet > tge that will display a dropdown menu of common environment variables
  * BASE_URL, WEBSITE_NAME, OUR_NAME, OUR_TELNUM, OUR_ADDRESS & OUR_EMAIL_ADDRESS

