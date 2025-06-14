
# vite-plugin-git-mark
Adds metadata about the current git repo state to entry points at build time

## Usage
The plugin is a raw object
```ts
import gitMarkPlugin from "vite-plugin-factory";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [ gitMarkPlugin() ]
    // ...
});
```

## Result
The plugin will add some debug informations at the top of entry points using the right syntax depending on the language
- **HTML**
  ```html
  <!-- Git metadata: {"commit":"64050e6a6345b171a35f81833367ba486ca13338","branch":"main","pending":false,"time":"2025-06-14T00:43:58.551Z"} -->
  ...
  ```
- **JavaScript (Or TypeScript)**
  ```js
  // Git metadata: {"commit":"64050e6a6345b171a35f81833367ba486ca13338","branch":"main","pending":false,"time":"2025-06-14T00:43:58.551Z"}
  ...
  ```
- Etc

## Metadata
These are the informations that get added to the entry points
- `commit`: The full hash of the current git commit at build time
- `branch`: The name of the current git branch at build time
- `pending`: Tells whether the build has been made while there were some pending changes
  - `false`: It generally means that the commit contains all the right code to reproduce this build
  - `true`: It generally means that, after the build, the pending changes that generated this build have been either discarded or committed on one of the commits that start from the current one at build time
- `time`: The moment at which the build was started