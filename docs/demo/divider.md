---
layout: default
title: Divider
style: demo/divider
script: demo/divider
---

# Divider
<button id='w-divider-demo-color-toggle' class='w-button wo-primary' style="float:right">Color Toggle</button>

{% assign cls='w-divider' %}
### class="{{cls}}
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-fit' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-skinny' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-slim' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-thin' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-thick' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-fat' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider wo-transparent' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/divider.html cls=cls %}
{:/}

<br>
{% assign cls='w-divider' %}
### class="{{cls}}" with text
{::nomarkdown}
{% include demo/divider.html cls=cls text='Divider' %}
{:/}
