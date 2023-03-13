const { default: axios } = require('axios');
const { load } = require('cheerio');
const { writeFileSync } = require('fs');

/**
 *
 * #org-members-table > ul > li:nth-child(1) > div.py-3.css-truncate.pl-3.flex-auto
 */

async function getPeopleGithubIds(page = 1) {
    const response = await axios.get(`https://github.com/orgs/mash-up-kr/people?page=${page}`);
    const html = response.data;

    const $ = load(html);

    const githubIds = $('#org-members-table > ul > li')
        .map((i, el) => {
            const [name, id] = $(el)
                .children('div.py-3.css-truncate.pl-3.flex-auto')
                .text()
                .trim()
                .split('\n')
                .map((value) => value.trim());

            if (id) {
                return id;
            }

            return name;
        })
        .toArray();

    return githubIds;
}

async function run() {
    try {
        const ids = [];
        const pageLength = 8;

        for (let i = 0; i < pageLength; i++) {
            const _ids = await getPeopleGithubIds(i + 1);
            console.log(_ids.length);
            ids.push(..._ids);
        }

        writeFileSync('./scripts/output/ids.txt', ids.join('\n'));
    } catch (error) {
        console.log(error);
    }
}

run();
