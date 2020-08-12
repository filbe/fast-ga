# Fast-GA
Super fast Google Analytics implementation

## Implementing in your site / app
- ensure that you have your Google Analytics (ga & gtag) included properly, *and* 
- ensure that you have working and tested **ga** function, for example:

```html
<!-- Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-Y"></script>
	<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-XXXXXXXX-Y', 'auto');
	ga('send', 'pageview');
	</script>
<!-- End Google Analytics -->

```
- Of course, you need to change your site's unique UA-code there. Check [Google's instructions how to do that](https://support.google.com/analytics/answer/1008080) if you don't know
- Include fast-ga.js right **after** the code above

```html
<script src="fast-ga.js"></script>
```


Add ***faga*** -attribute to all buttons, inputs, select-option -dropdowns and more to have automatic **GA triggers**!

```html
<elem faga faga-c="event-category" faga-n="event-name">...</elem>
```

...and that's it!

For example, if you want to track every change of selected option, you could do

```html
<select faga faga-c="customer-data" faga-n="customer-selection">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>
```

and when the user selects one of the options, it will send GA the selected values tagged with event category and name.

## Private datafields
If you want prevent sending exact values, for instance security reasons, add **faga-private** attribute:

```html
<input faga faga-c="customer-data" faga-n="customer-name" faga-private>
```

## What this actually does?

For every value-changing or clicked element:
```js
ga('send', 'event', [event-category], [event-name], [event-value]);
```
