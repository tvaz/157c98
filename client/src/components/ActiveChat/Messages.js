import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages
        // We want the messages to display with the newest at the bottom
        .sort((msg1, msg2) => {
          return moment(msg1.createdAt).isAfter(moment(msg2.createdAt)) ? 1 : -1;
        })
        .map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })
    }
    </Box>
  );
};

export default Messages;
