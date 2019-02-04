<h3 align="center">actions-counter</h3>
<p align="center">[WIP] A counter service for GitHub Actions<p>
<p align="center"><a href="https://npmjs.com/package/actions-counter"><img src="https://badgen.net/npm/v/actions-counter" alt="NPM"></a> <a href="https://travis-ci.org/JasonEtco/actions-counter"><img src="https://badgen.now.sh/travis/JasonEtco/actions-counter" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/actions-counter/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/actions-counter" alt="Codecov"></a></p>

## Usage

Automatically used by [`actions-toolkit`](https://github.com/JasonEtco/actions-toolkit).

You can also make PUTs:

```
curl -XPUT https://action-counter.is/my-workflow/my-action
```

## Routes

```
PUT /badge/:workflow/:action -> exports.increment
GET /badge/:action/runs -> exports.runs
GET /badge/:action/workflows -> exports.workflows
```

Uses [badgen](https://github.com/amio/badgen) to generate SVGs.

## Todo

* Determine host (Now, Lambda, GCF, other?)
* Update request/response code to match FaaS signature
* Get action/workflow names from request body
* Will `owner/action` names mess with the proposed routes?
