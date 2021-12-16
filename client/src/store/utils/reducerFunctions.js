export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const unread = (convo.latestSender === sender) ? convo.unread+1 : 0
      const newConvo = {
        ...convo,
        id: message.conversationId,
        //Append to end so the newest messages display first
        messages: [...convo.messages, message],
        latestMessageText: message.text,
        unread: unread
      }
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });
  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
   return state.map((convo) => {
     if(convo.otherUser.id === recipientId) {
         const newConvo = {
            ...convo,
           id: message.conversationId,
           messages: [message],
           latestMessageText: message.text,
           unread: 1
         }
         return newConvo;
         } else {
         return convo;
        }
   });
}

export const clearUnreadFromStore = (state, conversationId) => {
  const newState = state.map((convo) => {
    if(convo.id === conversationId) {
      const newConvo = {
        ...convo,
        unread: 0
      }
      return newConvo;
    } else {
      return convo;
    }
  });
  return newState;
};
