---
title: drawio animations
date: "2024-06-16T21:00:00+00:00"
lang: en
tags:
  - Utils
---

In this article I will go through on how you can create a quick diagram flow in Draw.io with animation

## Intro ##

In this article I will go through on how you can create a quick diagram flow in Draw.io

## Context ##

Draw.io, also known as diagrams.net, is a free, web-based diagramming application that allows users to create a wide range of diagrams and charts. It is commonly used for creating flowcharts, organizational charts, network diagrams, UML diagrams, mind maps, and other types of visual representations.

## Example ##

![Drawio example diagram](/images/test.drawio.svg)

## Key Features ##

* **User-Friendly Interface**: The interface is intuitive and easy to use, making it accessible for both beginners and advanced users.

* **Cloud Integration**: It integrates with various cloud storage services such as Google Drive, OneDrive, Dropbox, and GitHub, allowing users to save and access their diagrams from anywhere.

* **Collaboration**: Multiple users can collaborate on diagrams in real-time, which is useful for team projects and group work.

* **Extensive Shape Library**: Draw.io offers a vast library of shapes and icons, catering to different diagramming needs, from simple flowcharts to complex engineering diagrams.

* **Customization**: Users can customize shapes, styles, and formats to suit their specific requirements.

* **Import and Export**: It supports importing and exporting diagrams in various formats, including PNG, JPEG, SVG, PDF, and VSDX (Visio).

* **Offline Mode**: The application can be used offline by downloading the desktop version or using the Chrome app.

Now, most of this shouldn't be new to you if you have already used the tool. However, there are two points that I would like to reinforce:

1. **You can create animation flows**
1. **You can export to svg and keep those animations working**

## SVG Format ##

If you plan to use diagrams in a web interface, it's best to choose a solution that is resolution-independent and supports layers and animations. Therefore, be sure to export your final diagram to SVG format for optimal use in your project.

Here some of the benefits of SVG:

* **Scalability**: SVG images maintain quality at any size, making them perfect for responsive design.
* **Small File Size**: Typically smaller than raster images, leading to faster loading times.
* **Editability**: Easily modifiable with text editors or programmatically via CSS and JavaScript.
* **Interactivity and Animation**: Supports interactive elements and built-in animations without external plugins.
* **Accessibility**: Text is searchable and indexable; supports ARIA attributes for better accessibility.
* **Compatibility**: Supported by all major web browsers.
* **Styling Flexibility**: Can be styled using CSS, allowing for consistent and easily updatable designs.
* **Layering and Grouping**: Supports complex compositions through layering and grouping.
* **Reusability**: Graphics can be reused across different projects, saving time and effort.

## Create Animation Flows ##

Now that we have a format that support animations you can activate Flow Animation in some objects in Draw.io

When you link two objects with an arrow check the Properties field and activate **Flow Animation**

![Drawio properties example](/images/drawio-properties.png)

The options allow you the define the motion speed, direction and timing

## Conclusion ##

In this article, we explored the Flow Animation option in Draw.io and discussed the advantages of generating diagrams in SVG format. While other tools may offer more features, Draw.io makes it extremely easy to enhance your charts with animations, which can be particularly impressive in technical diagrams.

## References ##

* <https://app.diagrams.net/>
