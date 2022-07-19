# Strapi v4 - Site Publisher Plugin

This is a plugin for [Strapi](https://github.com/strapi/strapi) headless CMS. It lets you trigger a GitHub Action workflow when the site is ready to be published.

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

## Introduction

![Screenshot](./screenshots/screenshot.png 'Plugin Screenshot')

When using Strapi as a headless CMS for a statically built website, you need a way to trigger the site to rebuild when content has been updated. The typical approach is to setup a Strapi managed webhook to trigger a CI/CD pipeline whenever content changes. This approach has it's issues. For example when making many changes to content, builds are triggered multiple times and deployments can fail due to the site being deployed concurrently.

This plugin tackles the publishing flow a different way. The site administrators can take their time and make many changes and once the content update is complete they can trigger a single build.

This plugin also checks to see if a build is already in progress and not allow the user to trigger another. Also, when a build has been triggered the user can wait on the plugin page to see when the build and deployment has completed.

## Installation

Install this plugin with yarn:

```bash
yarn add strapi-plugin-site-publisher
```

## Configuration

Generate a config file at `config/plugins.js` or `config/development/plugins.js`, etc...

```javascript
module.exports = ({ env }) => ({
  'site-publisher': {
    owner: 'username', // The Github organisation or user
    repo: 'reponame', // The name of the repository
    workflow_id: 'rebuild.yml', // The workflow_id or filename
    token: env('GITHUB_TOKEN'), // The GitHub personal access token with access to trigger workflows and view build status
    branch: 'master', // The branch the workflow should be triggered on
    inputs: {
      // Optional inputs to pass through to the GitHub workflow
      some_input: 'Some value',
      some_other_input: 'Some other value',
    },
  },
});
```

Make sure you have variable in your .env file

```bash
GITHUB_TOKEN=XXXXXXX
```

## Use the Plugin

When the plugin has been installed correctly just click on "Publish Site" in the sidebar under plugins then click "Publish".

## Roadmap

- [ ] Error handling
- [ ] Support other deployment platforms (Gitlab CI, Bitbucket, Netlify, etc)
- [ ] Configure the plugin from admin panel

## Credits

This plugin is a fork of [strapi-plugin-github-publish](https://github.com/phantomstudios/strapi-plugin-github-publish) by [Phantom Studios](https://github.com/phantomstudios), many thanks to them for their work.

[npm-image]: https://img.shields.io/npm/v/strapi-plugin-site-publisher.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/strapi-plugin-site-publisher
[npm-downloads-image]: https://img.shields.io/npm/dm/strapi-plugin-site-publisher.svg
[npm-downloads-url]: https://npmcharts.com/compare/strapi-plugin-site-publisher?minimal=true
[ci-image]: https://github.com/colibris-xyz/strapi-plugin-site-publisher/workflows/Test/badge.svg
[ci-url]: https://github.com/colibris-xyz/strapi-plugin-site-publisher/actions
