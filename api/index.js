const fetch = require('node-fetch');

module.exports = async (req, res) => {
    let url = req.query.url

    if (!url){
      res.send("To get a print preview, append ?url=https://github....")
    }
    let html = await fetch(url).then((r) => r.text())
    .catch(() =>
      res.status(500).send("Encountered error serving profile page")
    );

    console.log(html)
    html = html.replace('</body>',
      `<script>const styleElement = document.createElement('style')
      styleElement.innerHTML = /*css*/\`
        * {
          font-family: Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
        }
      
        ins {
          display: block;
          page-break-after: always;
        }
      \`
      const insElements = Array.from(document.querySelectorAll('ins'))
      
      for (const insElement of insElements) {
        const parent = insElement.parentNode
        parent.parentNode.insertBefore(insElement, parent.nextSibling);
        parent.parentNode.removeChild(parent)
      }
      
      document.head.appendChild(styleElement)
      document.body.innerHTML = document.querySelector('#readme').innerHTML</script></body>`
    );

    res.send(html)
  }