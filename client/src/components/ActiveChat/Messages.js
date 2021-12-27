import { Box, Avatar } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const Messages = (props) => {
  const { messages, otherUser, userId, unread, latestSender} = props;

  // Calculate the index of the message we want to show the last read badge on
  let index = null;
  if (unread > 0 && userId === latestSender){
  for (let i=0; i < messages.length-1 ;i++) {
    if (messages[i].senderId === otherUser){
      continue;
    }
    else if (messages[i].read){
      index = messages[i].id
    } else {
      break;
    }
  }
  }
  const badge_id = index;

  const useStyles = makeStyles(() => ({
    badge: {
      height: 35,
      width: 35,
    }
  }));
  const classes = useStyles();


  // Generates the bubble component
  const generateTextBubble = (message, userId, otherUser, time, show_badge) => {
    const senderBubble = (
      <SenderBubble
        key={message.id} text={message.text} time={time} otherUser={otherUser}/>
    );
    const otherUserBubble = (
      <OtherUserBubble
        key={message.id} text={message.text} time={time} otherUser={otherUser}/>
    );
    return message.senderId === userId ? senderBubble : otherUserBubble
  }

  // Makes the avatar
  const generateReadBadge = (otherUser) => {
    return (
      <Avatar
        className={classes.badge}
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
      />)
  }

  return (
    <Box>
      {
      messages.map((message) => {
      const time = moment(message.createdAt).format("h:mm");
      const bubble = generateTextBubble(message, userId, otherUser, time);
      // Return avatar with the bubble if this message was the last read
      return badge_id === message.id ? [bubble, generateReadBadge(otherUser)] : bubble;
      })
      }

    </Box>

  );
}

export default Messages;
