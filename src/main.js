const core = require('@actions/core')
const github = require('@actions/github')

async function main () {
  try {
    const token = core.getInput('token')
    const [owner, repo] = core.getInput('repo').split('/')
    const limit = parseInt(core.getInput('limit'))
    const includePrerelease = core.getInput('include_prerelease') === 'true'

    const octokit = github.getOctokit(token)

    const releases = []

    for (let i = 0; releases.length < limit; i++) {
      const { data } = await octokit.repos.listReleases({
        owner,
        repo,
        per_page: limit,
        page: i
      })

      const rawleases = data.filter(r => includePrerelease ? !r.draft : !r.draft && !r.prerelease)

      releases.push(...rawleases)
    }

    const limitedReleases = releases.slice(0, limit)

    core.setOutput('releases', JSON.stringify(limitedReleases))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
