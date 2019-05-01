// @flow

/*
Créer une fonction pour vérifier les données d'une requête
*/
const checkFields = (required: Array<string>, reqBody: Array<string>): Object => {
  // Création de tableau pour les champs manquants ou en trop
  const miss = [];
  const extra = [];

  // Vérifier qu'il ne manque pas de champs
  required.forEach((prop) => {
    if (!(prop in reqBody)) {
      miss.push(prop);
    }
  });

  // Vérifier les champs en trop
  reqBody.forEach((prop) => {
    if (required.indexOf(prop) === -1) {
      extra.push(prop);
    }
  });

  // Vérifier les champs
  const ok = (extra.length === 0 && miss.length === 0);

  // Renvoyer le résultat
  return {
    ok,
    extra,
    miss,
  };
};

module.exports = {
  checkFields,
};
