const Contact = require('../models/Contact')

const ConflictError = require('../error-handlers/conflict.error')
const BadRequestError = require('../error-handlers/badRequest.error')

module.exports = {
  createContact: async (req, res) => {
    try {
      const { first_name, last_name, phone_number } = req.body

      if (first_name && last_name && phone_number) {
        const existingContact = await Contact.findOne({ phone_number })

        if (existingContact)
          return res
            .status(409)
            .send(new ConflictError('User with this phone number already exists'))

        return Contact.create({
          first_name,
          last_name,
          phone_number
        },
          (err, contact) => {
            if (err || !contact)
              return res
                .status(409)
                .send(new ConflictError(err.message || 'Error on creating new contact'))

            res.json({ code: 201, message: 'Created' })
          })
      }

      return res
        .status(400)
        .send(new BadRequestError('Not enough data provided'))

    } catch (error) {
      res.status(400).send(new BadRequestError(error.message))
    }
  },
  getContacts: (req, res) => {
    Contact.find((err, contacts) => {
      if (err || !contacts)
        return res
          .status(400)
          .send(new BadRequestError(err.message || 'No Contacts Found'))

      res.json({ code: 200, contacts })
    }).select('-__v')
  },
  updateContact: async (req, res) => {
    try {
      const { first_name, last_name, phone_number } = req.body

      if (first_name && last_name && phone_number && req.params.id) {
        const { id } = req.params

        const exisitingById = await Contact.countDocuments({ _id: id })
        const existingByPhoneNumber = await Contact.findOne({ phone_number })

        if (exisitingById > 0 && existingByPhoneNumber && id.localeCompare(existingByPhoneNumber.toObject()._id) !== 0)
          return res
            .status(409)
            .send(new ConflictError('User with this phone number already exists'))

        return Contact.updateOne(
          { _id: id },
          {
            $set: {
              first_name,
              last_name,
              phone_number
            }
          },
          (err, contact) => {
            if (err || !contact)
              return res
                .status(409)
                .send(new ConflictError(err.message || 'Could not update contact\'s details'))

            return res.json({ code: 204, message: 'Updated' })
          }
        )
      }

      res.status(400).send(new BadRequestError('Not enough data provided'))
    } catch (error) {
      res.status(400).send(new BadRequestError(error.message))
    }
  },
  deleteContact: (req, res) => {
    const { id } = req.params

    return Contact.deleteOne(
      { _id: id },
      (err, result) => {
        if (err || !result) return res
          .status(409)
          .send(new ConflictError(err.message || 'Could not delete contact'))

        return res.json({ code: 204, message: 'Deleted' })
      })
  }
}