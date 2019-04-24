const contactCtrl = require('../controllers/contact.ctrl')

module.exports = router => {
  /**
   * CREATE contact
   */
  router
    .route('/contact')
    .post(contactCtrl.createContact)

  /**
   * GET contact
   */
  router
    .route('/contact/all')
    .get(contactCtrl.getContacts)

  /**
   * UPDATE contact
   */
  router
    .route('/contact/:id')
    .patch(contactCtrl.updateContact)

  /**
   * DELETE contact
   */
  router
    .route('/contact/:id')
    .delete(contactCtrl.deleteContact)
}