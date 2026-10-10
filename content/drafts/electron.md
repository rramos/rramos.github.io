---
title: electron
date: '2025-01-14T10:00:00+00:00'
lang: en
draft: true
tags:
    - Frontend Development
    - UI
---

TBD

## Intro ##

TBD

Setting the application

```sh
npx create-electron-app@latest my-vue-app --template=vite
```

Adding dependencies

```sh
cd my-vue-app
npm install vue
npm install --save-dev @vitejs/plugin-vue
```

Updated packages as template used old version

```sh
npm audit fix --force
```

I then had some issues due to Wayland and electron36, check the Issues section.

Removed the devtools

Edited `main.js` and commented

```javascript
//mainWindow.webContents.openDevTools();
```

Tested

```sh
npm run start
```

And there you have you main window


## Issues

### Using GTK 2/3 and GTK 4 in the same process
```sh
Gtk-ERROR **: 08:33:59.321: GTK 2/3 symbols detected. Using GTK 2/3 and GTK 4 in the same process is not supported
```

This happens when Electron tries to mix GTK 2/3 and GTK 4 libraries within the same process and is related with the following [issue](https://github.com/electron/electron/issues/46538)

I had to downgrade electron to 35 version to work

```sh
"electron": "35.5.0",
```

### OpenGL Errors

```sh
[184927:0621/085053.563270:ERROR:angle_platform_impl.cc(49)] Display.cpp:1085 (initialize): ANGLE Display::initialize error 12289: Could not create a backing OpenGL context.
ERR: Display.cpp:1085 (initialize): ANGLE Display::initialize error 12289: Could not create a backing OpenGL context.
[184927:0621/085053.563371:ERROR:gl_display.cc(495)] EGL Driver message (Critical) eglInitialize: Could not create a backing OpenGL context.
[184927:0621/085053.563390:ERROR:gl_display.cc(767)] eglInitialize OpenGL failed with error EGL_NOT_INITIALIZED, trying next display type
[184927:0621/085053.565281:ERROR:angle_platform_impl.cc(49)] Display.cpp:1085 (initialize): ANGLE Display::initialize error 12289: Could not create a backing OpenGL context.
ERR: Display.cpp:1085 (initialize): ANGLE Display::initialize error 12289: Could not create a backing OpenGL context.
[184927:0621/085053.565331:ERROR:gl_display.cc(495)] EGL Driver message (Critical) eglInitialize: Could not create a backing OpenGL context.
[184927:0621/085053.565352:ERROR:gl_display.cc(767)] eglInitialize OpenGLES failed with error EGL_NOT_INITIALIZED
[184927:0621/085053.565374:ERROR:gl_display.cc(802)] Initialization of all EGL display types failed.
```

Was geeting a bunch of errors associated with OpenGL. It seems Wayland and electron are not playing together very well.

I opted by disabling gpu for the application, which may not be suitable for all the cases.

Added the following before the ap is ready, L31 in `main.js`

```javascript
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");
```


## References ##

* <https://www.youtube.com/watch?v=ML743nrkMHw>
