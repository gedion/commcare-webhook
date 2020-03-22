const mongoose = require('mongoose')

const CaseFormSchema = mongoose.Schema({
  app_id: String,
  domain: String,
  edited_by_user_id: String,
  edited_on: { type: Date },
  form: {
    '#type': String,
    '@name': String,
    '@uiVersion': String,
    '@version': String,
    Current_Status: {
      Residency: String
    },
    case: {
      '@case_id': String,
      '@date_modified': String,
      '@user_id': String,
      create: {
        case_name: String,
        case_type: String,
        owner_id: String
      }
    },
    meta: {
      appVersion: String,
      app_build_version: String,
      commcare_version: String,
      deviceID: String,
      drift: String,
      geo_point: String,
      instanceID: String,
      timeEnd: { type: Date },
      timeStart: { type: Date },
      userID: String,
      username: String
    }
  }
})

const Form = mongoose.model('form', CaseFormSchema)

const saveForm = (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const form = new Form(JSON.parse(body))
    form.save().then((result) => {
      res.json({ result })
    }).catch(err => res.status(500).json({ error: err }))
  })
}

module.exports = saveForm
