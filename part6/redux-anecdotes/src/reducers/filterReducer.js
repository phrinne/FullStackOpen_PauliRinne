const filterReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
      case 'FILTER':
        return action.filter
      default:
        return state
    }
  }

  export const setFilter = (filter) => {
    return {
      type: 'FILTER',
      filter
    }
  }

  export const removeFilter = () => {
    return {
      type: 'FILTER',
      filter: null
    }
  }

  export default filterReducer