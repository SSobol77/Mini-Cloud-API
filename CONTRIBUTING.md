# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE.md).

Everyone is welcome to contribute to Mini-Cloud. Contributing doesn’t just mean submitting pull requests—there are many different ways for you to get involved, including answering questions in [chat](https://telegram/), reporting or triaging [issues](https://github.com/github/SSobol77/Mini-Cloud/issues), and participating in the [Hubot Evolution](https://github.com/SSobol77/Mini-Cloud/evolution) process.

No matter how you want to get involved, we ask that you first learn what’s expected of anyone who participates in the project by reading the [Contributor Covenant Code of Conduct](http://contributor-covenant.org). By participating, you are expected to uphold this code.

# Stale issue and pull request policy

Issues and pull requests have a shelf life and sometimes they are no longer relevant. All issues and pull requests that have not had any activity for 90 days will be marked as `stale`. Simply leave a comment with information about why it may still be relevant to keep it open. If no activity occurs in the next 7 days, it will be automatically closed.

The goal of this process is to keep the list of open issues and pull requests focused on work that is actionable and important for the maintainers and the community.

# Pull Request Reviews & releasing

Pre-releasing `Mini-Cloud` is fully automated using [[semantic-release](https://github.com/SSobol77/Mini-Cloud/)]. Once merged into the `main` branch, `semantic-release` will automatically release a new version based on the commit messages of the pull request. For it to work correctly, make sure that the correct commit message conventions have been used. The ones relevant are

* `fix: …` will bump the fix version, e.g. 0.2.0 → 1.0.0
