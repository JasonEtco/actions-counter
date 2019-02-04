const badgen = require('badgen')
const knex = require('knex')

const queries = {
  async incrementActionRuns (action) {
    return knex('actions')
      .where({ action_name: action })
      .increment('runs', 1)
  },
  async incrementActionWorkflows (action, workflow) {
    const exists = knex('workflows')
      .where({ action, workflow })
      .count('id')
      .first()
    if (exists) return
    return knex('workflows')
      .insert({ action, workflow })
  },
  async getActionRuns (action) {
    return knex('actions')
      .where({ action_name: action })
      .first()
      .select('runs')
  },
  async getActionWorkflows (action) {
    return knex('workflows')
      .where({ action })
      .count('id')
  }
}

// Create the badge
const badge = (status, { style, color }) => badgen({
  style,
  status,
  subject: 'GitHub Action',
  color: 'purple' || color
})

// Called when an action is run
exports.increment = async (res) => {
  // TODO: Get action and workflow from query
  const action = 'action'
  const workflow = 'workflow'
  await Promise.all([
    queries.incrementActionRuns(action),
    queries.incrementActionWorkflows(action, workflow)
  ])
  res.send(200)
}

// Send the response
const CACHE_CONTROL = `public, max-age=60, stale-while-revalidate=604800, stale-if-error=604800`
function send (res, svg) {
  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  res.setHeader('Cache-Control', `${CACHE_CONTROL}, s-maxage=604800`)
  return res.send(200, svg)
}

exports.runs = async (res) => {
  // TODO: Get action and workflow name from query
  const action = 'action'
  const count = await queries.getActionRuns(action)
  const svg = badge(`${count} runs`)
  send(res, svg)
}

exports.workflows = async (res) => {
  // TODO: Get action and workflow name from query
  const action = 'action'
  const workflow = 'workflow'
  const count = await queries.getActionWorkflows(action, workflow)
  const svg = badge(`in ${count} workflows`)
  send(res, svg)
}
