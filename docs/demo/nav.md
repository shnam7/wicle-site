---
layout: default
title: Nav
---

# Nav

## Single-level navigation

{% assign cls='w-nav' %}
### Vertical nav, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex1.html id='menu-1' cls=cls %}
{% include demo/nav-icons.html cls=cls %}
{:/}


{% assign cls='w-nav wo-horizontal' %}
### Horizontal nav, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex1.html cls=cls %}
{% include demo/nav-icons.html cls=cls %}
{:/}

{% assign cls='w-nav wo-horizontal' %}
### Custom colored horizontal nav, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex1.html id='custom-menu' cls=cls %}
{% include demo/nav-icons.html cls=cls %}
{:/}

{% assign cls='w-nav wo-horizontal wo-separators' %}
### Horizontal nav with separators, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex1.html cls=cls %}
{% include demo/nav-icons.html cls=cls %}
{:/}


<br>

## Multi-level navigation

{% assign cls='w-nav wo-accordion' %}
### Accordion menu, class: {{cls}}
{::nomarkdown}
{% include demo/nav-ex2.html cls=cls %}
{:/}

{% assign cls='w-nav wo-dropdown' %}
### Dropdown menu, class: {{cls}}
{::nomarkdown}
{% include demo/nav-ex2.html cls=cls %}
{:/}

{% assign cls='w-nav wo-horizontal wo-dropdown wo-pointer wo-separators' %}
### Horizontal dropdown menu, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex2.html cls=cls %}
{:/}

{% assign cls='w-nav wo-horizontal wo-dropdown wo-pointer wo-separators wo-invert' %}
### Horizontal dropdown menu, class:{{cls}}
{::nomarkdown}
{% include demo/nav-ex2.html cls=cls %}
{:/}

{% assign cls='w-nav wo-default' %}
### menu defaul, class:{{cls}} (wo-horizontal wo-dropdown wo-pointer)
{::nomarkdown}
{% include demo/nav-ex2.html cls=cls %}
{:/}

