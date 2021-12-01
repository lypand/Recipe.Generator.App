import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('recipe.db');

export const retrieveRecipesByUsername = (username) =>{
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM recipe WHERE username = ?;',
            [username],
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
          );
        });
      });
      return promise;
}

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipe (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, username TEXT NOT NULL);',
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

export const insertRecipe = (title, imageUri, username) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO recipe (title, imageUri, username) VALUES (?, ?, ?);`,
            [title, imageUri,username],
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