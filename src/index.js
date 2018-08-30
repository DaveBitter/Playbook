import animate from "./vendor/animate.js";

class PlayBook {
  /**
   * @param {Object} options - Options for playBook, includes scenes and general behaviour
   */
  constructor(options) {
    this._options = options;

    this._initializePlayBook();
  }

  /**
   * Initializes the playBook based on the general behaviour options that are passed
   */
  _initializePlayBook() {
    this._options.async ? this._runScenesAsync() : this._runScenes();
  }

  /**
   * Runs scenes passed in the options in a syncronous manner and
   * resolves it's promise as soon as all scenes are performed
   */

  //  TODO: async?
  _runScenes() {
    return new Promise(resolve => {
      const { scenes } = this._options;

      (async () => {
        for (let scene of scenes) {
          await this._runSceneKeyframes(scene);
        }
        this._options.async ? this._runScenes() : resolve();
      })();
    });
  }

  /**
   * Runs scenes passed in the options in a asyncronous manner and
   * resolves it's promise as soon as all scenes are performed
   */
  _runScenesAsync() {
    // TODO: remove promise
    return new Promise(resolve => {
      const { scenes } = this._options;
      const scenePromises = scenes.map(scene => this._runSceneKeyframes(scene));

      Promise.all(scenePromises).then(
        () => (this._options.loop ? this._runScenesAsync() : resolve())
      );
    });
  }

  /**
   *
   * Runs all keyframes of the scene passed in the parameters in a asyncronous manner and
   * resolves it's promise as soon as all keyframes are performed
   * @param {Object} scene - Scene object with keyframes and general behaviour options
   * @returns {Promise}
   */
  _runSceneKeyframes(scene) {
    let { keyframes, options } = scene;

    if (options && !options.animationApi)
      keyframes = this._enrichKeyframesWithOptions(keyframes, options);

    return new Promise(resolve => {
      options && options.animationApi
        ? (options.element.animate(keyframes, options).onfinish = () =>
            resolve())
        : (async () => {
            for (let keyframe of keyframes) {
              await this._runAnimation(keyframe);
            }
            resolve();
          })();
    });
  }

  /**
   * Returns a promise created by Animate.js
   * @param {Object} keyframe - Keyframe options holding all needed configuration for Animate.js
   * @returns {Promise} - Animate.js Promise
   */
  _runAnimation(keyframe) {
    return animate(keyframe);
  }

  /**
   * Method use to apply general behaviour options, like easing, to each
   * keyframe instead of having to add it to each keyframe in the config
   * passed in this._options
   * @param {Array} keyframes - Array with keyframes to enrich
   * @param {Object} options - Object with options to enrich keyframes with
   * @returns {Array} - Array with enriched keyframes
   */
  _enrichKeyframesWithOptions(keyframes, options) {
    return keyframes.map(keyframe => ({
      ...keyframe,
      ...options
    }));
  }
}

export default PlayBook;
