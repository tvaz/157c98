import React from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  const showUnread = (conversation) => {
    if (conversation.messages.length > 0 ){
      // We need the most recent (last) message
      const messages_len = conversation.messages.length
      if (messages_len > 0) {
        if (conversation.messages[messages_len - 1].senderId === otherUser.id ) {
          // If the sender of the last message is the other user,
          // We want to show the unread messages bubble
          return conversation.unread;
        }
      }
    }
      return 0;
    }

  return (
    <Badge
      badgeContent={ showUnread(conversation) }
      color="primary"
      overlap="rectangle"
      anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      >
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
    </Box>
    </Badge>

  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
