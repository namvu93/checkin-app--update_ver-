
export const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim())
  }

export const updateErr = (err, stateUpdater) => {
    stateUpdater(err);
    setTimeout(() => {
      stateUpdater('')
    }, 2500);
  }

export const isValidEmail = (value) => {
    const regx =  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
    return regx.test(value)
  }