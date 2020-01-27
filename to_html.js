const fs = require('fs');

map = 'data-science'
f = fs.readFileSync(map + '/data.json')
data = JSON.parse(f)

function scan_tree(data, level) {
    s = ''

    if (data.children) {
        s += `<div id=${data.id}>\n`
        s += `<h${level}>${data.name1}</h${level}>` + '\n'
    }
    else {
        s += `<p><a href="${data.link}">${data.name1}</a> - ${data.desc}` + '\n'
        if (data.gh){
            s += `<a class="github-button" href="${data.gh}" data-icon="octicon-star" data-show-count="true">GH Stars</a>`
        }

        s += '</p>'
    }

    for (child in data.children) {
        s += scan_tree(data.children[child], level+1) + '\n'
    }

    if (data.children) {
        s += '</div>\n'
    }

    return s
}


out = 
`
<script async defer src="https://buttons.github.io/buttons.js"></script>
${scan_tree(data, 2)}
`

fs.writeFileSync(`${map}.html`, out)