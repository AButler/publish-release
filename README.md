## Publish Release - GitHub Action

<a href="https://github.com/AButler/publish-release"><img alt="GitHub Actions status" src="https://github.com/AButler/publish-release/workflows/CI/badge.svg"></a>

The Publish Release GitHub Action publishes a draft GitHub release. This is a cross-platform action that runs on any environment.

### Usage

```yml
jobs:
  build:
    # ...
    steps:
      - uses: AButler/publish-release@v1.0
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

| Name          | Description                                                                                     | Examples                                                 |
|---------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `repo-token`  | The GitHub token to use to amend the release _(recommended to use `${{ secrets.GITHUB_TOKEN }}`)_ | `${{ secrets.GITHUB_TOKEN }}`                            |