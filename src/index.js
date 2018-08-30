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
    // this._options.async ? this._runScenesAsync() : this._runScenes();
    this._runScenes();
  }

  /**
   * Runs scenes passed in the options in a syncronous or asyncronous manner
   */
  _runScenes() {
    const { scenes } = this._options;
    const scenePromises = this._options.async
      ? scenes.map(scene => this._runSceneKeyframes(scene))
      : null;

    this._options.async
      ? Promise.all(scenePromises).then(() => {
          if (this._options.loop) this._runScenes();
        })
      : (async () => {
          for (let scene of scenes) {
            await this._runSceneKeyframes(scene);
          }
          if (this._options.loop) this._runScenes();
        })();
  }

  /**
   *
   * Runs all keyframes of the scene passed in the parameters in a syncronous or asyncronous manner and
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
              await animate(keyframe);
            }
            resolve();
          })();
    });
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
