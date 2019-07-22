---
layout: default
title:  "QOpenGLWidget for augmented reality"
date:   2017-08-23
categories: AR Qt5 OpenGL-ES C++
---

During development of [ARticated](www.nope) I took responsibility for converting
the acquired 3D information and input image into an augmented image.

![ipo_model](assets/nope)

I should mention that the specifics of `Vission Processing` are left out of this post,
you could use OpenCV like we did with the first itteration of ARticated, or like the second iteration, write some processing
operators from scratch, or like the planned third iteration, use GPU acceleration to speed up the processing.
But none of that matters here: we simply take the numbers and augment reality.
