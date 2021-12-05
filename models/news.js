const axios = require('axios')
const cheerio = require('cheerio')


const newspapers = [
    {
        name: 'noticiasdomar',
        address: 'https://www.noticiasdomar.pt/index.php/mais/economia-do-mar',
        base: 'https://www.noticiasdomar.pt'
    },
    {
        name: 'euronews',
        address: 'https://pt.euronews.com/tag/mar',
        base: 'https://pt.euronews.com'
    },
    {
        name: 'diariodenoticias',
        address: 'https://www.dn.pt/tag/mar.html',
        base: 'https://www.dn.pt'
    }
]

const articles = []
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("mar")', html).each(function () {
                const tittle = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    tittle,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })

        }).catch((err) => console.log(err))
})


exports.getNEWS = (req, res) => {
    res.json(articles)
}

