/**
 * Symbols for transition style
 */
const TransitionStyle = {
  Instant: Symbol('Transition Style - instant')
}

/**
 * Scene names
 */
const SceneName = {
  MainMenu: Symbol('Scene Name - Main Menu')
}

/**
 * Main Menu scene
 * @param {Function} transition - the function to call with a scenename & transition style to switch to
 */
function SceneMainMenu (
  transition
) {
  const title = document.createElement('h1')
  title.innerText = 'The Penumbral Temple'
  const mount = (root) => {
    root.appendChild(title)
  }
  const unmount = (root) => {
    root.removeChild(title)
  }
  const render = () => {

  }

  return {
    mount,
    unmount,
    render
  }
}

/**
 * SceneManager owns the dictionary of scenes & controls transitioning between them
 */
function SceneManager () {
  const scenes = {}
  const container = document.createElement('div')
  container.style.width = '1280px'
  container.style.height = '720px'
  container.style.position = 'absolute'
  container.style.left = 'calc(50vw - 640px)'
  container.style.top = 'calc(50vh - 360px)'
  container.style.background = 'white'

  let currentScene = null

  const mount = (root) => {
    root.style.background = 'black'
    root.appendChild(container)
  }

  const unmount = (root) => {
    root.removeChild(container)
  }

  const render = () => {
    scenes[currentScene].render()
  }

  const transition = (sceneName, style) => {
    if (!(sceneName in scenes)) {
      throw new Error(`SceneManager#transition -- sceneName ${JSON.stringify(sceneName)} not in dictionary of scenes, valid scenes are ${JSON.stringify(Object.keys(scenes))}. Did you forget a scene register somewhere?`)
    }
    if (style === TransitionStyle.Instant) {
      if (scenes[currentScene] != null) {
        scenes[currentScene].unmount(container)
      }
      currentScene = sceneName
      scenes[currentScene].mount(container)
    } else {
      throw new Error(`SceneManager#unimplemented transition -- sceneName ${JSON.stringify(sceneName)} with transition ${JSON.stringify(style)}, see SceneManager#transition for recognized transitions`)
    }
  }

  const addScene = (name, scene) => {
    scenes[name] = scene
    if (currentScene === null) {
      transition(name, TransitionStyle.Instant)
    }
  }

  return {
    mount,
    unmount,
    addScene,
    transition,
    render
  }
}

/**
 * Bootstrap - check for core dependencies
 */
{
  const errors = [
    // check that we are client side
    () => { if (typeof window === 'undefined') throw new Error('Missing window object') }
  ].reduce((errors, check, index) => {
    try {
      check()
    } catch (error) {
      errors.push({
        index,
        error
      })
    }
    return errors
  }, [])

  if (errors.length) {
    for (const e of errors) {
      console.error(`check ${e.index}: ${e.error.message}`, e.error)
    }
    throw new Error('Error occured during bootstrap - see console for details')
  }
}

/**
 * Bootstrap - startup game
 */
window.addEventListener('load', () => {
  const s = SceneManager()
  s.addScene(SceneName.MainMenu, SceneMainMenu())
  s.mount(document.body)
  const renderTick = () => {
    window.requestAnimationFrame(() => {
      s.render()
      renderTick()
    })
  }
  renderTick()
})
