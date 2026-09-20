const fs = require('fs');

const fileContent = fs.readFileSync('App.js', 'utf8');

// Facebook ჩაშენებული პლეერის HTML გენერატორი
const embedHtml = (url) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    body, html { margin: 0; padding: 0; background-color: #070913; color: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; overflow-x: hidden; }
    .fb-video, .fb-post { width: 100% !important; max-width: 500px; }
    iframe { border: none !important; width: 100% !important; }
  </style>
</head>
<body>
  <div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/ka_GE/sdk.js#xfbml=1&version=v18.0"></script>
  <div class="fb-post" data-href="${url}" data-width="auto" data-show-text="true"></div>
</body>
</html>
`;

