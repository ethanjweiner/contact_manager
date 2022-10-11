import Controller from '/javascripts/controller.js';
import Model from '/javascripts/model.js';
import View from '/javascripts/view.js';

(async () => {
  const TEMPLATE_NAMES = [
    'contact_form',
    'contacts_page',
    'contacts_list',
    'contact',
    'tags',
  ];
  Handlebars.templates = {};

  async function compileTemplates() {
    const promises = TEMPLATE_NAMES.map((templateName) =>
      fetch(`templates/${templateName}.handlebars`)
        .then((response) => response.text())
        .then((template) => {
          Handlebars.templates[templateName] = Handlebars.compile(template);
        })
    );

    try {
      await Promise.all(promises);
    } catch {
      alert('Could not compile templates.');
    }
  }

  await compileTemplates();
  Handlebars.partials = Handlebars.templates;

  new Controller(new Model(), new View());
})();
