# Get Releases Action

This action retrieve github releases and return their info.

## Inputs

### `repo`

**Required** GitHub repo under `<owner>/<repo>` format.

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
```
