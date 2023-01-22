import { getInput, setOutput, setFailed } from '@actions/core'
import { getOctokit } from '@actions/github'

async function main () {
  try {
    const fields = getInput('fields').replace(' ', '').split(',')
    const token = getInput('token')
    const [owner, repo] = getInput('repo').split('/')
    const limit = parseInt(getInput('limit'))
    const includePrerelease = getInput('include_prerelease') === 'true'

    const octokit = getOctokit(token)

    const releases = []

    for (let i = 0; releases.length < limit; i++) {
      const { data } = await octokit.rest.repos.listReleases({
        owner,
        repo,
        per_page: limit,
        page: i
      })

      const rawleases = data
        .filter(r => includePrerelease ? !r.draft : !r.draft && !r.prerelease)
        .map((r: Record<string, any>) => {
          const release: Record<string, any> = {}
          for (const field of fields) {
            release[field] = r[field]
          }
          return release
        })

      releases.push(...rawleases)
    }

    const limitedReleases = releases.slice(0, limit)

    setOutput('releases', JSON.stringify(limitedReleases))
  } catch (err: any) {
    setFailed(err.message)
  }
}

main()
