---
layout: default
title: Image
body_class: demo-image
---

# Image

{% assign cls='w-image' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}

{% assign cls='w-image wo-round' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}

{% assign cls='w-image wo-frame' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}

{% assign cls='w-image wo-thumbnail' %}
### class="{{cls}}" (wo-thumbnail = wo-round + wo-frame)
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}

{% assign cls='w-image wo-circle' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}

{% assign cls='w-image wo-circle wo-frame' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/image.html cls=cls %}
{:/}
