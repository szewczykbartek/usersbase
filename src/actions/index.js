export const usersImport = (list) => {
    return {
      type: 'USERS_IMPORT',
      data: list
    }
};

export const userSave = (id, list) => {
    return {
      type: 'USER_SAVE',
      id: id,
      data: list
    }
};
export const userRemove = (id) => {
    console.log(id);
    return {
      type: 'USER_REMOVE',
      id: id
    }
};
export const userAdd = (list) => {
    return {
      type: 'USER_ADD',
      id: new Date().getTime(),
      data: list
    }
};




export const settingEdit = (id) => {
    return {
      type: 'SETTING_EDIT',
      id: id
    }
};
export const settingDetail = (id) => {
    return {
      type: 'SETTING_DETAIL',
      id: id
    }
};
