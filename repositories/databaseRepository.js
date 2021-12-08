import * as SQLite from 'expo-sqlite'

var db = SQLite.openDatabase('recipe.db');

export const doesTableExist = (tableName) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM sqlite_master WHERE type=\'table\' AND name=?',
        [tableName],
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
      )
    });
  });
  return promise;
}

// Status 0 == unseen
// Status 1 == liked
// Status 2 == disliked
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recipe (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL,webUri TEXT NOT NULL, status INTEGER NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      )
    });
  });
  return promise;
};

export const insertRecipe = (title, imageUri, webUri, status) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO recipe (title, imageUri, webUri, status) VALUES (?, ?, ?, ?);`,
        [title, imageUri, webUri, status],
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

export const getRecipesByStatus = (status) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM recipe WHERE status = ?;',
        [status],
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


export const updateRecipeStatus = (recipeId, status) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE recipe SET status = (?) WHERE id = (?)`,
        [status, recipeId],
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