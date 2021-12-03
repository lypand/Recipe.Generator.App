import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('recipe.db');
//maybe we just have a table that contains the ids of favoites? 


export const reset = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS recipe;',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      ),
        tx.executeSql(
          'DROP TABLE IF EXISTS favorites',
          [],
          () => {
            resolve();
          },
          (_, err) => {
            reject(err);
          }
        );
    });
  });
  return promise;
}

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipe (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      ), tx.executeSql(
        'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, recipeId INTEGER NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertRecipe = (title, imageUri) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO recipe (title, imageUri) VALUES (?, ?);`,
        [title, imageUri],
        (_, result) => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const retrieveFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT r.* FROM recipe r INNER JOIN favorites f ON r.id = f.recipeId;',
        [],
        (_, response) => {
          resolve(response);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const insertFavorite = (recipeId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO favorites (recipeId) VALUES (?);`,
        [recipeId],
        (_, result) => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    })
  });
  return promise
};