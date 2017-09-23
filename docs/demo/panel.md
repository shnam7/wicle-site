---
layout: default
title: Panel
---

# Panel
<button id='w-panel-demo-color-toggle' class='w-button wo-primary' style="float:right">Alpha Toggle</button>
<script>
  $('#w-panel-demo-color-toggle').click(function () {
    $('.demo-panel').toggleClass('wo-alpha');
  });
</script>

{% assign cls='w-panel' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-primary' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-secondary' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-success' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-info' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-warning' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}

{% assign cls='w-panel wo-danger' %}
### class="{{cls}}"
{::nomarkdown}
{% include demo/panel.html cls=cls %}
{:/}
