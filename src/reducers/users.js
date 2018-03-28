var userDataNew, stateNew, index;

const reducer_users = (state = [], action) => {
  switch (action.type) {
    case 'USERS_IMPORT':
      return action.data

    case 'USER_EDIT':
      return state

    case 'USER_SAVE':
      stateNew = state;
      index = stateNew.findIndex(a => a.id === action.id);
      userDataNew = {
        'id': action.id,
        'firstname': action.data.firstname,
        'surname': action.data.surname,
        'city': action.data.city,
        'country': action.data.country,
        'gender': action.data.gender,
        'cover': action.data.cover
      }
      stateNew[index] = userDataNew;
      return stateNew.map(e => e);

      case 'USER_ADD':
        userDataNew = {
          'id': action.id,
          'firstname': action.data.firstname,
          'surname': action.data.surname,
          'city': action.data.city,
          'country': action.data.country,
          'gender': action.data.gender,
          'cover': action.data.cover
        }
        return [
          ...state,
          userDataNew
        ]

    case 'USER_REMOVE':
      stateNew = state;
      index = stateNew.findIndex(a => a.id === action.id);

      stateNew.splice(index, 1);
      return stateNew.map(
        e => e
      );

    default:
      return state
  }
}

export default reducer_users
