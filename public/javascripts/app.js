import Controller from '/javascripts/controller.js';
import Model from '/javascripts/model.js';
import View from '/javascripts/view.js';

const TEMPLATES = ['home', 'contact_form'];

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

compileTemplates().then(() => new Controller(new Model(), new View()));
