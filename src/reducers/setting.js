const reducer_setting = (state = [], action) => {
  switch (action.type) {
    case "SETTING_EDIT":
      return {
        ...state,
        edit: action.id
      };

    case "SETTING_DETAIL":
      return {
        ...state,
        detail: action.id
      };

    default:
      return state;
  }
};

export default reducer_setting;
