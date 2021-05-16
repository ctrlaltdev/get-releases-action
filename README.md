# Get Releases Action

This action retrieve github releases and return their info.

## Inputs

### `repo`

**Required** GitHub repo under `<owner>/<repo>` format.
### `fields`

**Required** Fields to return in the json, comma separated. Default: name,tag_name.

### `token`

**Required** GitHub token to make authed request to GH APIs.

### `limit`

**Required** How many releases to return. Default: 10.

### `include_prerelease`

**Required** If prereleases should be included. Default: false.

## Outputs

### `releases`

The Releases data.

## Example usage

```yml
uses: ctrlaltdev/get-releases-action@latest
with:
  repo: ctrlaltdev/get-releases-action
  token: ${{ secrets.GITHUB_TOKEN }}
```
