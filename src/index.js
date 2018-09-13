import animate from "./vendor/animate.js";

class PlayBook {
  /**
   * @param {Object} options - Options for playBook, includes scenes and general behaviour
   */
  constructor(options) {
    this._options = options;

    this._runScenes();
  }

  /**
   * Runs scenes passed in the options in a syncronous or asyncronous manner
   */
  async _runScenes() {
    const { scenes } = this._options;

    if (this._options.async) {
      const scenePromises = scenes.map(scene => this._runSceneKeyframes(scene))
      await Promise.all(scenePromises)
    } else {
      for (let scene of scenes) {
        await this._runSceneKeyframes(scene);
      }
    }

    if (this._options.loop) this._runScenes();
  }

  /**
   *
   * Runs all keyframes of the scene passed in the parameters in a syncronous or asyncronous manner and
   * resolves it's promise as soon as all keyframes are performed
   * @param {Object} scene - Scene object with keyframes and general behaviour options
   * @returns {Promise}
   */
  async _runSceneKeyframes(scene) {
    let { keyframes, options = {} } = scene;

    if (options.animationApi) {
      return new Promise(resolve => options.element.animate(keyframes, options).onfinish = () => resolve());
    } else {
      keyframes = this._enrichKeyframesWithOptions(keyframes, options);

      for (let keyframe of keyframes) {
        await animate(keyframe);
      }
    }
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
