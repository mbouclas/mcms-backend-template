# angular-reverse-url

# Usage
Reverse URLs from your `$routeProvider` by controller name and URL fragments.

`<a href="{{ 'MyController'|reverseUrl }}">My link</a>`

`<a href="{{ 'MyController'|reverseUrl:{fragment: data} }}">My link</a>`

# Installation

`bower install angular-reverse-url`

# Testing

Tests use Karma and Jasmine. Install with `npm install`, and run with `karma start`.
