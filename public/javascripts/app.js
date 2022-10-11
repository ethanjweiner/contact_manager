import Controller from '/javascripts/controller.js';
import Model from '/javascripts/model.js';
import View from '/javascripts/view.js';

(async () => {
  const TEMPLATES = ['contact_form', 'contacts_list', 'tags'];
  const PARTIALS = ['tags', 'contact'];

  async function compileTemplates() {
    Handlebars.templates = {};

    const promises = TEMPLATES.map((templateName) =>
      fetch(`templates/${templateName}.handlebars`)
        .then((response) => response.text())
        .then((template) => {
          Handlebars.templates[templateName] = Handlebars.compile(template);
        })
    );

    try {
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  }

  async function registerPartials() {
    const promises = PARTIALS.map((partialName) => {
      fetch(`/templates/${partialName}.handlebars`)
        .then((response) => response.text())
        .then((template) => {
          Handlebars.registerPartial(partialName, template);
        });
    });

    try {
      await Promise.all(promises);
    } catch (err) {
      console.log(err);
    }
  }

  await registerPartials();
  await compileTemplates();
  const app = new Controller(new Model(), new View());
})();
