const fs = require('fs');
const path = require('path');

const entitiesDir = path.join(__dirname, 'src/entities');

fs.readdir(entitiesDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.endsWith('.ts') && !file.includes('.entity.')) {
      const newName = file.replace('.ts', '.entity.ts');
      fs.rename(
        path.join(entitiesDir, file),
        path.join(entitiesDir, newName),
        (err) => {
          if (err) throw err;
          console.log(`Renamed ${file} to ${newName}`);
        },
      );
    }
  });
});
