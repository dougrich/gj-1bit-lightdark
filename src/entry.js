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
  const d = document.createElement('div')
  d.innerText = 'Hello World, from a template for online gamejams'
  document.body.appendChild(d)
})
