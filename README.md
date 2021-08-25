# GitHub Timeline
Its simple use embeded GitHub timeline.Its work with api.github.

## Introduce
+ [Roadmap](#roadmap)
+ [Usage](#usage)
  + [Example](#example-code-and-screen-shot) 
+ [Contributing](#contributing)
+ [License](#license)

## Roadmap
You can see what we've done before and what we will work on in the future;

- [x] Basic styling
- [x] Multiple timeline in same file
- [x] Responsive styling(auto detected screen size and restyling)
- [x] Light/Dark theme
- [ ] Event(start, push, commit, review etc.) icon
- [ ] Detailed event info
- [ ] Multiple language
- [ ] Fix size(small, medium, large) attribute
- [ ] Auto component generator and previewer web site
- [ ] Customizable colors

`// TODO`

## Usage
**1**: Past the `div` on your HTML code then change the username from `data-username`
```html
<div class="github-timeline" data-username="github-username"></div>
```

**2**: Add the external script in your body
```html
<script src="https://cdn.jsdelivr.net/gh/saracalihan/github-timeline/js/scripts.js"></script>
```
> "https://cdn.jsdelivr.net/gh/saracalihan/github-timeline/js/scripts.min.js" is a compressed version of the same script file 

Now its ready to work :)

[Try it](https://codepen.io/saracalihan/pen/vYxxMjg)


### Data attributes


| Attribute | Description | Values | Default Value |
| ------| -----------| ------| -----------|
| data-username | The name of the username whose timeline will be created | all valid GitHub usernames | |
| data-theme | helps to choose a theme | [dark](./images/dark-theme.png), [light](./images/light-theme.png) | light |

### Example code and screenshot
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Github Timeline</title>
    <style>
        body {
        display: flex;
        flex-direction: column;
        background-color: rgb(46, 46, 46);
        }

        .examples{
        margin: auto;
        }

        .examples > div {
        margin: 10px;
        }

    </style>
  </head>

  <body>
    <div class="examples">
      <!-- Usage copy the div what has class "github-timeline" then  -->
      <div class="github-timeline" data-username="saracalihan"></div>
      <div class="github-timeline" data-username="yourUsername" data-theme="dark"></div>
      <div class="github-timeline" data-username="userNotFoundExample"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/saracalihan/github-timeline/js/scripts.js"></script>
  </body>
</html>
```

---

![Example Code](./images/example.png)

## Contributing
`// TODO`
## License
[GNU GENERAL PUBLIC LICENSE Version 3](LICENSE)
